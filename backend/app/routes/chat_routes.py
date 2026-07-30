from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.agents.swarm_engine import SwarmRunner
from app.agents.swarm_agents import AGENT_REGISTRY, main_agent

router = APIRouter(prefix="", tags=["OpenAI Swarm AI Chat"])

class SwarmChatRequest(BaseModel):
    message: str
    agent_name: Optional[str] = "main"
    context_variables: Optional[Dict[str, Any]] = None
    chat_history: Optional[List[Dict[str, Any]]] = None

@router.post("/chat")
@router.post("/api/v1/chat")
def handle_swarm_chat(payload: SwarmChatRequest):
    if not payload.message:
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")

    # Select starting agent from registry or default to main agent
    start_agent = AGENT_REGISTRY.get(payload.agent_name.lower(), main_agent)
    
    runner = SwarmRunner()
    
    messages = payload.chat_history or []
    messages.append({"role": "user", "content": payload.message})
    
    try:
        response = runner.run(
            agent=start_agent,
            messages=messages,
            context_variables=payload.context_variables or {}
        )
        
        # Extract last assistant message
        last_message = ""
        for m in reversed(response.messages):
            if m.get("role") == "assistant":
                last_message = m.get("content", "")
                break
                
        return {
            "status": "success",
            "response": last_message,
            "active_agent": response.agent.name,
            "handoff_history": response.handoff_history,
            "context_variables": response.context_variables,
            "messages": response.messages
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Swarm orchestration error: {str(e)}")
