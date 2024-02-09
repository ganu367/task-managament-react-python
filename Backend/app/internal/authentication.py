from fastapi import APIRouter, Depends, status, HTTPException, Response, Request, Form, Body,Cookie
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import models
import hashing
import tokens
import schemas
import oauth2
from fastapi.security import OAuth2PasswordRequestForm
import os
from typing import Optional
from jose import jwt
from dotenv import dotenv_values, load_dotenv
from datetime import datetime,timedelta

config = dotenv_values(".env")
connect = load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

router = APIRouter(prefix="/auth", tags=["Authentication"])


get_db = database.get_db


@router.post("/login")
def login(response: Response, request: Request, request_detail: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    val_user = db.query(models.User).filter(
        models.User.username == request_detail.username)

    if not val_user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User does not exists")

    else:
        # verify password between requesting by a user & database password
        if not hashing.Hash.verify(val_user.first().password, request_detail.password):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Incorrect Passwords")
        else:

            jwt_token = tokens.create_access_token(data={"user": {
                "username": val_user.first().username, "isAdmin": val_user.first().is_admin}})

           
            
            response.set_cookie(
            key="access_token",
            value=f"Bearer {jwt_token}",
            secure=True,
            httponly=True,
            max_age=120, expires=120,
                            )
          
            return {"response": response}
          
     
@router.get("/logout")
def logout(response: Response, request: Request):
    response = RedirectResponse("/login", status_code=302)
    response.delete_cookie(key='access_token')  # Corrected key
    return response
