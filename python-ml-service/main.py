from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# Create FastAPI app
app = FastAPI(
    title="Pokemon ML Service",
    description="Pokemon Prediction API using FastAPI and Machine Learning",
    version="1.0.0"
)

model = joblib.load("model.pkl")

# Request schema
class PokemonRequest(BaseModel):
    hp: int
    attack: int
    defense: int
    speed: int

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Pokemon ML Service Running"
    }

# Health endpoint
@app.get("/health")
async def health():
    return {
        "status": "ok"
    }

# Predict endpoint
@app.post("/predict")
async def predict(data: PokemonRequest):
    
    sample = pd.DataFrame([{
        "hp": data.hp,
        "attack": data.attack,
        "defense": data.defense,
        "speed": data.speed
    }])

    # Predict
    prediction = model.predict(sample)

    return {
        "prediction": prediction[0]
    }