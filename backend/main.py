from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS (already good, keep it)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}

# Input model
class TrafficInput(BaseModel):
    density: dict
    emergency: bool
    rain: bool
    crowd: str
    school: bool

# Logic function
def calculate_score(density, emergency, rain, crowd, school):
    scores = {}
    crowd_map = {"Low": 0.1, "Medium": 0.2, "High": 0.3}

    for road, d in density.items():
        score = (
            0.5 * d +
            (1.0 if emergency else 0) +
            crowd_map.get(crowd, 0) +
            (0.2 if rain else 0) +
            (0.4 if school else 0)
        )
        scores[road] = round(score, 2)

    return scores

# MAIN API (IMPORTANT)
@app.post("/predict")
def predict(data: TrafficInput):
    scores = calculate_score(
        data.density,
        data.emergency,
        data.rain,
        data.crowd,
        data.school
    )

    best_road = max(scores, key=scores.get)

    return {
        "scores": scores,
        "selected": best_road,
        "reason": f"{best_road} selected due to highest priority (traffic + conditions)"
    }

@app.get("/api/traffic")
def traffic():
    # Example static response
    return {"density": 50}
