from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Import our new ML matcher
from ml.skill_matcher import matcher

load_dotenv()

app = FastAPI(title="CampusOS TITAN X - AI Engine")

class MatchRequest(BaseModel):
    user_id: str
    skill_wanted: str

class DemandPredictionRequest(BaseModel):
    menu_item_id: str
    date: str

@app.get("/")
def read_root():
    return {"status": "ok", "service": "ai-engine"}

@app.post("/recommend/products")
def recommend_products(user_id: str):
    # Stub for collaborative filtering
    return {"user_id": user_id, "recommendations": ["prod_1", "prod_2"]}

@app.post("/match/skills")
def match_skills(req: MatchRequest):
    """
    Uses TF-IDF and Cosine Similarity to find the best skill providers
    based on the student's natural language request.
    """
    try:
        matches = matcher.find_matches(req.skill_wanted, top_k=3)
        return {
            "requested_skill": req.skill_wanted,
            "total_matches": len(matches),
            "top_matches": matches
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/food-demand")
def predict_food_demand(req: DemandPredictionRequest):
    # Stub for time-series forecasting
    return {"predicted_orders": 45, "confidence": 0.88, "peak_hour": "13:00"}

@app.post("/assistant/query")
def ai_assistant(query: str):
    # Stub for RAG / general LLM query
    return {"response": "I am TITAN X Assistant, how can I help?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
