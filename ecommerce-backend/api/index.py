from mangum import Mangum
from app.main import app

# Mangum handler for Vercel serverless
handler = Mangum(app, lifespan="off")
