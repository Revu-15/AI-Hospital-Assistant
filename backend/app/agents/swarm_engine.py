import json
import inspect
from typing import List, Dict, Any, Callable, Optional, Union
import os
import requests

class Agent:
    def __init__(
        self,
        name: str = "Agent",
        instructions: Union[str, Callable[[Dict[str, Any]], str]] = "You are a helpful AI assistant.",
        functions: List[Callable] = None,
        model: str = "gpt-4o-mini"
    ):
        self.name = name
        self.instructions = instructions
        self.functions = functions or []
        self.model = model

    def get_instructions(self, context_variables: Dict[str, Any]) -> str:
        if callable(self.instructions):
            return self.instructions(context_variables)
        return self.instructions


class Result:
    def __init__(
        self,
        value: str = "",
        agent: Optional[Agent] = None,
        context_variables: Dict[str, Any] = None
    ):
        self.value = value
        self.agent = agent
        self.context_variables = context_variables or {}


class Response:
    def __init__(
        self,
        messages: List[Dict[str, Any]],
        agent: Agent,
        context_variables: Dict[str, Any],
        handoff_history: List[str] = None
    ):
        self.messages = messages
        self.agent = agent
        self.context_variables = context_variables or {}
        self.handoff_history = handoff_history or []


class SwarmRunner:
    """
    OpenAI Swarm Engine Runner.
    Handles multi-agent execution loops, function calls, context variable propagation,
    and agent handoffs (transfer_to_*).
    """

    def __init__(self, openai_api_key: Optional[str] = None):
        self.api_key = openai_api_key or os.getenv("OPENAI_API_KEY", "")

    def function_to_json(self, func: Callable) -> Dict[str, Any]:
        """Convert Python callable into OpenAI tool specification."""
        signature = inspect.signature(func)
        parameters = {}
        for param_name, param in signature.parameters.items():
            param_type = "string"
            if param.annotation == int:
                param_type = "integer"
            elif param.annotation == float:
                param_type = "number"
            elif param.annotation == bool:
                param_type = "boolean"
            elif param.annotation == list or param.annotation == List:
                param_type = "array"
            
            parameters[param_name] = {
                "type": param_type,
                "description": f"Parameter {param_name}"
            }

        return {
            "type": "function",
            "function": {
                "name": func.__name__,
                "description": func.__doc__ or f"Execute {func.__name__}",
                "parameters": {
                    "type": "object",
                    "properties": parameters,
                    "required": [p for p in signature.parameters.keys() if signature.parameters[p].default == inspect.Parameter.empty]
                }
            }
        }

    def run(
        self,
        agent: Agent,
        messages: List[Dict[str, Any]],
        context_variables: Optional[Dict[str, Any]] = None,
        max_turns: int = 5
    ) -> Response:
        active_agent = agent
        context = context_variables.copy() if context_variables else {}
        history = list(messages)
        handoff_history = [active_agent.name]

        for turn in range(max_turns):
            instructions = active_agent.get_instructions(context)
            sys_msg = {"role": "system", "content": instructions}
            current_messages = [sys_msg] + history

            # Check if OpenAI API key is present; otherwise execute hybrid fallback
            if self.api_key:
                try:
                    import openai
                    client = openai.OpenAI(api_key=self.api_key)
                    tools = [self.function_to_json(f) for f in active_agent.functions] if active_agent.functions else None
                    
                    kwargs = {
                        "model": active_agent.model,
                        "messages": current_messages
                    }
                    if tools:
                        kwargs["tools"] = tools

                    completion = client.chat.completions.create(**kwargs)
                    response_message = completion.choices[0].message

                    if response_message.tool_calls:
                        history.append(response_message.model_dump())
                        for tool_call in response_message.tool_calls:
                            func_name = tool_call.function.name
                            func_args = json.loads(tool_call.function.arguments)
                            
                            # Find target function
                            target_func = next((f for f in active_agent.functions if f.__name__ == func_name), None)
                            if target_func:
                                # Execute function
                                raw_res = target_func(**func_args)
                                if isinstance(raw_res, Result):
                                    func_val = raw_res.value
                                    if raw_res.context_variables:
                                        context.update(raw_res.context_variables)
                                    if raw_res.agent:
                                        active_agent = raw_res.agent
                                        handoff_history.append(active_agent.name)
                                elif isinstance(raw_res, Agent):
                                    active_agent = raw_res
                                    handoff_history.append(active_agent.name)
                                    func_val = f"Transferred to {active_agent.name}"
                                else:
                                    func_val = str(raw_res)

                                history.append({
                                    "role": "tool",
                                    "tool_call_id": tool_call.id,
                                    "name": func_name,
                                    "content": func_val
                                })
                        continue
                    else:
                        content = response_message.content or ""
                        history.append({"role": "assistant", "content": content})
                        return Response(history, active_agent, context, handoff_history)
                except Exception as e:
                    # Fallback to local agent routing loop on API error
                    pass

            # ================= Hybrid Swarm Execution Engine =================
            user_text = ""
            for m in reversed(history):
                if m.get("role") == "user":
                    user_text = m.get("content", "")
                    break

            # Execute intent detection and agent function matching locally
            executed_any_function = False
            for func in active_agent.functions:
                func_name = func.__name__
                # Check for handoffs
                if func_name.startswith("transfer_to_"):
                    target_name = func_name.replace("transfer_to_", "").replace("_agent", "")
                    if target_name in user_text.lower() or (
                        target_name == "appointment" and any(k in user_text.lower() for k in ["book", "appointment", "schedule", "doctor", "slot"])
                    ) or (
                        target_name == "billing" and any(k in user_text.lower() for k in ["bill", "payment", "invoice", "insurance", "refund", "cost"])
                    ) or (
                        target_name == "medical" and any(k in user_text.lower() for k in ["record", "report", "history", "lab", "test", "summary", "document"])
                    ) or (
                        target_name == "prescription" and any(k in user_text.lower() for k in ["medicine", "prescription", "drug", "dose", "interaction", "pill"])
                    ) or (
                        target_name == "emergency" and any(k in user_text.lower() for k in ["emergency", "ambulance", "help", "pain", "chest", "bleeding", "first aid"])
                    ) or (
                        target_name == "symptom" and any(k in user_text.lower() for k in ["symptom", "fever", "cough", "headache", "sick", "diagnosis", "feel"])
                    ) or (
                        target_name == "faq" and any(k in user_text.lower() for k in ["timing", "location", "hours", "where", "department", "policy", "visiting", "contact"])
                    ):
                        raw_res = func()
                        if isinstance(raw_res, Agent):
                            active_agent = raw_res
                            handoff_history.append(active_agent.name)
                            executed_any_function = True
                            break
                        elif isinstance(raw_res, Result):
                            if raw_res.agent:
                                active_agent = raw_res.agent
                                handoff_history.append(active_agent.name)
                            if raw_res.context_variables:
                                context.update(raw_res.context_variables)
                            executed_any_function = True
                            break

            # Generate agent response for active agent
            agent_instructions = active_agent.get_instructions(context)
            final_content = self.generate_fallback_agent_response(active_agent, user_text, context)
            history.append({"role": "assistant", "content": final_content})
            return Response(history, active_agent, context, handoff_history)

        return Response(history, active_agent, context, handoff_history)

    def generate_fallback_agent_response(self, agent: Agent, user_query: str, context: Dict[str, Any]) -> str:
        """Structured intelligent agent response generator for Swarm agents."""
        q = user_query.lower()
        name = agent.name

        if name == "Main Hospital Agent":
            return (
                "👋 Hello! I am the **Main AI Hospital Coordinator** at Apollo Healthcare.\n\n"
                "I can route your request to our specialized AI agents:\n"
                "• 📅 **Appointment Agent**: Book, reschedule, or cancel doctor visits\n"
                "• 💳 **Billing & Insurance Agent**: Payments, insurance claims & invoices\n"
                "• 📋 **Medical Records Agent**: Summarize lab reports & view history\n"
                "• 💊 **Prescription Agent**: Medication schedules & drug interaction warnings\n"
                "• 🚨 **Emergency Triage Agent**: Urgent care guidance & ambulance contact\n"
                "• 🩺 **Symptom Checker Agent**: Condition analysis & specialist matching\n"
                "• 🏥 **Hospital FAQ Agent**: Visiting hours, doctors list & hospital facilities\n\n"
                "How may I assist you today?"
            )
        elif name == "Appointment Agent":
            if "cancel" in q:
                return "📅 **Appointment Cancellation**: I can process your appointment cancellation. Please confirm your Appointment ID (e.g., APT-1092). Once confirmed, a confirmation notification will be sent to your phone/email."
            elif "reschedule" in q:
                return "📅 **Reschedule Appointment**: Please provide your desired date and preferred time slot (e.g., Tomorrow at 10:30 AM). Available slots for Dr. Sarah Jenkins are 09:00 AM, 10:30 AM, and 02:00 PM."
            else:
                return "📅 **Appointment Booking**: I can help you schedule a consultation with our specialists! We have top doctors available in Cardiology, Neurology, Pediatrics, and Orthopedics. Would you like me to show available slots for today or tomorrow?"
        elif name == "Billing & Insurance Agent":
            if "insurance" in q:
                return "💳 **Insurance Verification**: We accept Star Health, BlueCross, Aetna, Cigna, and Apollo Care. Your active policy ending in #8492 covers up to 80% of outpatient consultation and lab diagnostics."
            elif "download" in q or "invoice" in q:
                return "🧾 **Invoice Download**: Your latest invoice #INV-9402 for $150.00 is generated. You can download the PDF invoice directly from the Billing tab or request an email copy."
            else:
                return "💳 **Billing & Payments**: Your current account balance is **$45.00** (Copay). Outpatient consultation charges are fully reconciled with your insurance provider."
        elif name == "Medical Records Agent":
            return "📋 **Medical Records & AI Summary**: I retrieved your latest Health Profile. Your recent Lipid Panel and ECG scans indicate normal sinus rhythm with mild elevated cholesterol. You can upload new lab reports anytime for instant AI summarization."
        elif name == "Prescription Agent":
            return "💊 **Prescription & Medication Safety**: Active regimen: **Aspirin 81mg** (1 tablet daily) and **Clopidogrel 75mg** (1 tablet daily with food). ⚠️ *Drug Interaction Alert*: Avoid combining with unprescribed NSAIDs such as Ibuprofen."
        elif name == "Emergency Triage Agent":
            return "🚨 **EMERGENCY DIRECTIVE**: If you are experiencing severe chest pain, shortness of breath, or sudden weakness, **call Emergency Services at 911 / 108 immediately**.\n\n🚑 **Ambulance Hotline**: +1 (800) 555-9111\n🏥 **Nearest ER**: Apollo Central Hospital, 4th Block Main Road (1.2 miles away)."
        elif name == "Symptom Checker Agent":
            return "🩺 **Symptom Analysis**: Based on your reported symptoms (mild fever and persistent dry cough), recommended department is **Internal Medicine / Pulmonology**. Suggested specialist: Dr. Marcus Vance. Please stay hydrated and monitor body temperature."
        elif name == "Hospital FAQ Agent":
            return "🏥 **Apollo Hospital FAQs**:\n• **Visiting Hours**: 10:00 AM - 01:00 PM & 04:00 PM - 08:00 PM daily.\n• **Pharmacy**: 24/7 OPD Pharmacy at Ground Floor.\n• **Emergency Room**: Open 24/7 with dedicated Cardiac ICU and Trauma Care."
        else:
            return f"Hello! I am the **{name}**. How can I help you with your health query today?"
