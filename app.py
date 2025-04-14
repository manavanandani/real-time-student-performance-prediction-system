from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

# Load the trained model
with open("salary_predictor.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_salary(request: Request):
    data = await request.json()
    years_exp = data.get("years_experience")
    age = data.get("age")

    if years_exp is None or age is None:
        return {"error": "Please provide both 'years_experience' and 'age'"}

    features = np.array([[years_exp, age]])
    prediction = model.predict(features)[0]

    return {
        "input": {"years_experience": years_exp, "age": age},
        "predicted_salary": round(prediction, 2)
    }
