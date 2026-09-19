from fastapi import APIRouter

router = APIRouter(prefix="/api/cold-storage", tags=["Cold Storage Facilities"])

COLD_STORAGE_DATA = [
    {
        "id": "cs_1",
        "facility_name": "Sri Lakshmi Cold Storage & Logistics",
        "location": "Guntur Bypass Road, NH-16",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "distance_km": 8.2,
        "capacity_mt": 500.0,
        "available_space_mt": 120.0,
        "supported_produce": ["Tomato", "Chilli", "Vegetables"],
        "rate_per_day_quintal": 12,
        "contact_phone": "Demo Contact: +91 90000 33001",
        "is_demo": True
    },
    {
        "id": "cs_2",
        "facility_name": "Guntur Mega Agro Chilling Plant",
        "location": "Autonagar, Tenali Road",
        "latitude": 16.2430,
        "longitude": 80.6400,
        "distance_km": 14.5,
        "capacity_mt": 1200.0,
        "available_space_mt": 350.0,
        "supported_produce": ["Chilli (Red)", "Fruits", "Spices"],
        "rate_per_day_quintal": 10,
        "contact_phone": "Demo Contact: +91 90000 33002",
        "is_demo": True
    }
]

@router.get("")
async def get_cold_storages():
    return {
        "success": True,
        "facilities": COLD_STORAGE_DATA
    }
