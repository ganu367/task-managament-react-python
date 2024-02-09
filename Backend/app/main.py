from fastapi import FastAPI, Request
from fastapi.responses import  HTMLResponse,JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from internal import authentication, registration
from routers import task
import oauth2
import schemas
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import database
import os 
from dotenv import dotenv_values, load_dotenv

config = dotenv_values(".env")
connect = load_dotenv()

# SECRET_KEY = os.getenv('SECRET_KEY')
# ALGORITHM_CODE = os.getenv('ALGORITHM')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

get_db = database.get_db

models.Base.metadata.create_all(engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return "Welcome Task Management"


app.include_router(authentication.router)
app.include_router(registration.router)
app.include_router(task.router)
