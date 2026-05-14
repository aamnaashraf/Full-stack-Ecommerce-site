from fastapi import FastAPI
from mangum import Mangum

app = FastAPI(title="E-Commerce API Test")

@app.get("/")
def root():
    return {"message": "E-Commerce API", "status": "working"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Mangum handler for AWS Lambda/Vercel
handler = Mangum(app)
