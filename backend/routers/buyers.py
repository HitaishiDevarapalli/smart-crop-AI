from fastapi import APIRouter

router = APIRouter(prefix="/api/buyers", tags=["Buyer Directory"])

BUYERS_DATA = [
    {
        "id": "b1",
        "name": "Sri Lakshmi Agri Processing Pvt Ltd",
        "buyer_type": "Processor",
        "crop_required": "Tomato",
        "min_quantity_tons": 5.0,
        "price_offered": 2850,
        "location": "Guntur Industrial Estate",
        "phone_number": "Demo Contact: +91 90000 11001",
        "verified": True,
        "is_demo": True
    },
    {
        "id": "b2",
        "name": "Kisan Direct Exports",
        "buyer_type": "Exporter",
        "crop_required": "Chilli (Red)",
        "min_quantity_tons": 2.0,
        "price_offered": 15500,
        "location": "Vijayawada Cargo Hub",
        "phone_number": "Demo Contact: +91 90000 11002",
        "verified": True,
        "is_demo": True
    },
    {
        "id": "b3",
        "name": "Deccan Fresh Agro Traders",
        "buyer_type": "Trader",
        "crop_required": "Onion",
        "min_quantity_tons": 10.0,
        "price_offered": 2000,
        "location": "Kurnool Wholesale Yard",
        "phone_number": "Demo Contact: +91 90000 11003",
        "verified": True,
        "is_demo": True
    }
]

@router.get("")
async def get_buyers():
    return {
        "success": True,
        "buyers": BUYERS_DATA
    }
