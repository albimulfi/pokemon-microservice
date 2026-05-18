from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {
        "message": "Pokemon ML Service Running!"
    }

@app.get("/health")
async def health():
    return {
        "status": "ok"
    }