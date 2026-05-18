
Nama: Albi Mulfi
NIM: 2410511083
Kelas: B



# Pokemon Microservice AI Recommendation System
Sistem microservice sederhana menggunakan:
- FastAPI (Python Machine Learning Service)
- Express.js (API Gateway)
- Scikit-learn Machine Learning Model

# Arsitektur Sistem
Client
↓
Express.js Gateway
↓
FastAPI ML Service
↓
Machine Learning Model

# Teknologi yang Digunakan

## Backend Gateway
- Node.js
- Express.js
- Axios
- CORS

## Machine Learning Service
- FastAPI
- Scikit-learn
- Pandas
- NumPy
- Joblib

# Dataset
Dataset menggunakan data statistik Pokémon sederhana:
- HP
- Attack
- Defense
- Speed

Target prediction:
- Weak
- Normal
- Strong

# Machine Learning Model
Model menggunakan:
```python
RandomForestClassifier
```

Model dilatih menggunakan scikit-learn dan disimpan menggunakan:

```python
joblib.dump()
```

# Endpoint Documentation
## FastAPI ML Service
Base URL:

```text
http://localhost:8000
```
### GET /
Check service status.

### GET /health
Health check endpoint.

### POST /predict
Predict Pokémon category.

Example request:

```json
{
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100
}
```

Example response:

```json
{
  "prediction": "Strong"
}
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

## Express Gateway
Base URL:

```text
http://localhost:3000
```

### GET /
Check gateway status.

### GET /health
Gateway health check.

### POST /pokemon/recommend
Endpoint untuk memanggil Python ML Service.
Example request:

```json
{
  "name": "Charizard",
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100
}
```

Example response:

```json
{
  "pokemon": "Charizard",
  "stats": {
    "hp": 78,
    "attack": 84,
    "defense": 78,
    "speed": 100
  },
  "prediction": "Strong"
}
```

# Cara Menjalankan Project
## 1. Clone Repository
```bash
git clone https://github.com/albimulfi/pokemon-microservice.git
```

# 2. Jalankan Python ML Service
Masuk ke folder:

```bash
cd python-ml-service
```

Aktifkan virtual environment:
## Windows

```bash
venv\Scripts\activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

Jalankan FastAPI:

```bash
uvicorn main:app --reload
```

ML Service berjalan di:

```text
http://localhost:8000
```

# 3. Jalankan Express Gateway
Buka terminal baru.
Masuk ke folder:

```bash
cd express-gateway
```

Install dependency:

```bash
npm install
```

Jalankan server:

```bash
node server.js
```

Gateway berjalan di:

```text
http://localhost:3000
```

---

# Testing
## Swagger

```text
http://localhost:8000/docs
```

## Test Endpoint Express
POST:

```text
http://localhost:3000/pokemon/recommend
```

Request Body:

```json
{
  "name": "Charizard",
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100
}
```