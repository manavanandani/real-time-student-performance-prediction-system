# 📚 Student Score Predictor (End-to-End System using Node.js, MongoDB, Redis, FastAPI, and ML)

> A complete real-time student performance prediction system using modern full-stack technologies.

---

## 🔍 Problem Statement

Educational institutions often struggle to **predict student success early**. This project aims to build an **end-to-end predictive system** that uses historical study hours and attendance data to:

1. Store and retrieve student records in **real-time**
2. Use **machine learning** to predict student scores
3. Serve results through **RESTful APIs**
4. Optimize performance with **caching (Redis)**

This system simulates how analytics and AI can be used to drive early intervention and performance support.

---

## 🚀 Tech Stack

| Component      | Technology 
|----------      |------------
| Backend API    | Node.js (Express.js) 
| Database       | MongoDB 
| Caching Layer  | Redis 
| ML Model       | Scikit-Learn (Linear Regression) 
| Model Serving  | FastAPI 
| Integration    | Axios between Node.js and FastAPI 
| Tools          | Postman, Docker, Swagger UI 

---

## 🛠️ Project Structure

```
├── models/
│   └── Student.js           # Mongoose schema
├── controllers/
│   └── studentController.js # All logic (GET, POST, PUT, Predict)
├── routes/
│   └── studentRoutes.js     # API routing
├── app.py                   # FastAPI app serving ML model
├── score_predictor.pkl      # Trained ML model
├── Student_Performance_Dataset.csv
├── server.js                # Node.js server entry point
└── README.md
```

---

## ⚙️ How It Works

### ✅ Step 1: Train ML Model
```bash
python train_model.py
```

```python
# train_model.py
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

df = pd.read_csv("Student_Performance_Dataset.csv")
X = df[['StudyHours', 'Attendance']]
y = df['Score']

model = LinearRegression()
model.fit(X, y)
joblib.dump(model, 'score_predictor.pkl')
```

---

### ✅ Step 2: Start FastAPI (Model Server)
```bash
uvicorn app:app --reload --port 8000
```

You can test prediction at:
```
http://localhost:8000/docs
```

---

### ✅ Step 3: Start Redis & MongoDB (via Docker)
```bash
docker run -d --name redis-server -p 6379:6379 redis
docker run -d --name mongodb -p 27017:27017 mongo
```

---

### ✅ Step 4: Start Node.js Server
```bash
npm install
node server.js
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/students` | Fetch all student records (uses Redis) |
| POST   | `/api/students` | Add a new student record |
| PUT    | `/api/students/:id` | Update a student record |
| POST   | `/api/students/predict-score` | Call FastAPI and return predicted score |

---

## 🔁 Redis Caching Logic

- GET requests are cached for 5 minutes using Redis
- On `PUT` update, Redis cache is cleared to fetch fresh data

---

## 🧪 Sample Prediction

Request to:
```
POST /api/students/predict-score
```

JSON Body:
```json
{
  "study_hours": 9,
  "attendance": 88
}
```

Sample Response:
```json
{
  "study_hours": 9.0,
  "attendance": 88.0,
  "predicted_score": 89.41
}
```

---

## 📸 Screenshots (Example)

### Swagger UI `/predict`
![Swagger UI](images/swagger-predict.png)

### Postman - Prediction Endpoint
![Postman Response](images/postman-predict-score.png)

---

## 📈 Future Scope

- Add user authentication for secure API access
- Integrate frontend dashboard (React)
- Store predictions in MongoDB for history tracking
- Add analytics dashboard for score trends

---

## 📎 Final Thoughts

This project showcases how to:
- Build modern APIs using **Node.js**
- Serve **ML predictions in real time** using **FastAPI**
- Use **Redis caching** to optimize data delivery
- Integrate full-stack technologies for real-world use cases

---

Would you like me to package this as a downloadable `README.md` and give you suggestions for image paths or GitHub repo name?
