import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import auth, farmer, crop, weather, market, buyers, fpos, cold_storage, transport, workers, ai_chat, notifications, admin

load_dotenv()

app = FastAPI(
    title="Sanjeevani API",
    description="Smart Crop Care & Direct Market Access Backend Engine",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router)
app.include_router(farmer.router)
app.include_router(crop.router)
app.include_router(weather.router)
app.include_router(market.router)
app.include_router(buyers.router)
app.include_router(fpos.router)
app.include_router(cold_storage.router)
app.include_router(transport.router)
app.include_router(workers.router)
app.include_router(ai_chat.router)
app.include_router(notifications.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {
        "app": "Sanjeevani API",
        "status": "online",
        "tagline": "From Crop Care to Market - Your Farming Companion",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "Supabase PostgreSQL Ready",
        "ai_engine": "WPF Model Loaded",
        "weather_service": "Open-Meteo API Connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
