import os
import csv
from fastapi import APIRouter, Query
from typing import Optional, List

router = APIRouter(prefix="/api/v1/hospitals", tags=["Hospital Search Directory"])

HOSPITALS_CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "hospitals.csv")

def load_hospitals():
    hospitals = []
    if not os.path.exists(HOSPITALS_CSV_PATH):
        return hospitals

    try:
        with open(HOSPITALS_CSV_PATH, mode="r", encoding="utf-8", errors="ignore") as f:
            reader = csv.DictReader(f)
            for row in reader:
                hospitals.append({
                    "id": row.get("", "").strip() or row.get("0", "").strip(),
                    "name": row.get("Hospital", "").strip(),
                    "state": row.get("State", "").strip(),
                    "city": row.get("City", "").strip(),
                    "address": row.get("LocalAddress", "").strip(),
                    "pincode": row.get("Pincode", "").strip()
                })
    except Exception as e:
        print("Error reading hospitals CSV:", e)
    return hospitals

@router.get("/search")
@router.get("/directory")
def search_hospitals(
    query: Optional[str] = Query(None, description="Search by hospital name, city, state, or address"),
    state: Optional[str] = Query(None, description="Filter by state"),
    city: Optional[str] = Query(None, description="Filter by city"),
    limit: int = Query(50, description="Max results to return")
):
    all_hospitals = load_hospitals()
    filtered = all_hospitals

    if state:
        st = state.strip().lower()
        filtered = [h for h in filtered if st in h["state"].lower()]

    if city:
        ct = city.strip().lower()
        filtered = [h for h in filtered if ct in h["city"].lower()]

    if query:
        q = query.strip().lower()
        filtered = [
            h for h in filtered if (
                q in h["name"].lower() or 
                q in h["city"].lower() or 
                q in h["state"].lower() or 
                q in h["address"].lower() or 
                q in h["pincode"].lower()
            )
        ]

    return {
        "status": "success",
        "total_matches": len(filtered),
        "returned": len(filtered[:limit]),
        "hospitals": filtered[:limit]
    }

@router.get("/meta/cities")
def get_cities_and_states():
    all_hospitals = load_hospitals()
    cities = sorted(list(set(h["city"] for h in all_hospitals if h["city"])))
    states = sorted(list(set(h["state"] for h in all_hospitals if h["state"])))

    return {
        "status": "success",
        "total_cities": len(cities),
        "total_states": len(states),
        "states": states,
        "cities": cities
    }
