from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/workers", tags=["Farm Worker Coordination"])

class WorkRequestSchema(BaseModel):
    work_type: str
    date: str
    workers_needed: int
    location: str
    instructions: Optional[str] = None

class StatusUpdateSchema(BaseModel):
    request_id: str
    new_status: str

# Central Coordinator State
COORDINATOR_STATE = {
    "coordinator_name": "Venkateswara Rao (Village Farm Coordinator)",
    "region": "Guntur & Tadikonda Mandal",
    "today_status": "Available",
    "total_workers_available": 14,
    "phone_number": "Demo Contact: +91 90000 55001",
    "whatsapp_link": "https://wa.me/919000055001?text=Hello%20Coordinator,%20I%20need%20farm%20workers",
    "is_demo": True,
    "work_matrix": [
        {"work_type": "Harvesting", "status": "Available", "rate_per_day": 500, "workers_free": 6},
        {"work_type": "Planting & Sowing", "status": "Available", "rate_per_day": 450, "workers_free": 4},
        {"work_type": "Field Cleaning & Weeding", "status": "Limited", "rate_per_day": 400, "workers_free": 2},
        {"work_type": "Irrigation & Spraying", "status": "Unavailable", "rate_per_day": 450, "workers_free": 0}
    ]
}

WORK_REQUESTS_LIST: List[dict] = [
    {
        "id": "wr_201",
        "farmer_name": "Ramesh Kumar",
        "work_type": "Harvesting",
        "date": "2026-09-20",
        "workers_needed": 4,
        "location": "Tadikonda East Field",
        "instructions": "Need workers by 7:00 AM for tomato harvest",
        "status": "Confirmed",
        "created_at": "Today, 08:00 AM"
    }
]

@router.get("/coordinator")
async def get_coordinator_info():
    return {
        "success": True,
        "coordinator": COORDINATOR_STATE
    }

@router.get("/availability")
async def get_worker_availability():
    return {
        "success": True,
        "today_status": COORDINATOR_STATE["today_status"],
        "total_available": COORDINATOR_STATE["total_workers_available"],
        "matrix": COORDINATOR_STATE["work_matrix"]
    }

@router.get("/requests")
async def get_work_requests():
    return {
        "success": True,
        "requests": WORK_REQUESTS_LIST
    }

@router.post("/requests")
async def create_work_request(req: WorkRequestSchema):
    new_req = req.model_dump()
    new_req["id"] = f"wr_{201 + len(WORK_REQUESTS_LIST)}"
    new_req["farmer_name"] = "Ramesh Kumar"
    new_req["status"] = "Waiting for Coordinator"
    new_req["created_at"] = "Just now"
    WORK_REQUESTS_LIST.insert(0, new_req)
    return {
        "success": True,
        "message": "Worker request submitted to Central Farm Work Coordinator.",
        "request": new_req
    }

@router.post("/update-status")
async def update_request_status(update: StatusUpdateSchema):
    for item in WORK_REQUESTS_LIST:
        if item["id"] == update.request_id:
            item["status"] = update.new_status
            return {"success": True, "request": item}
    raise HTTPException(status_code=404, detail="Work request not found.")
