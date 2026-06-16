from fastapi import FastAPI

app = FastAPI(
    title="MaintAI API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "Welcome to MaintAI API"}

@app.get("/health")
def health():
    return {"status": "healthy"}
