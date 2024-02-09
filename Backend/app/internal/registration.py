from fastapi import APIRouter, Depends, status, HTTPException, Response, Request
from fastapi.responses import RedirectResponse, HTMLResponse 
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import schemas
import models
import hashing
import tokens
import oauth2
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["Authentication"])

get_db = database.get_db

templates = Jinja2Templates(directory="templates")


@router.post("/register")
def create_user(response: Response, request: Request, user_field: schemas.UserCreate, db: Session = Depends(get_db)):
    val_user = db.query(models.User).filter(
        models.User.username == user_field.username)

    if not val_user.first():

        if (user_field.password == user_field.confirm_password):

                
                new_user = models.User(name=user_field.name, username=user_field.username, created_by=user_field.username,
                                       password=hashing.Hash.bcrypt(user_field.password))
                db.add(new_user)
                db.commit()
                db.refresh(new_user)

                jwt_token = tokens.create_access_token(data={"user": {
                    "username": user_field.username, "isAdmin": False}})


                response.set_cookie(key="access_token",
                                    value=f"Bearer {jwt_token}", httponly=True)

                return {"status": 200}
                # return {"user_data":new_user,"cookies":response}
            

        else:
            raise HTTPException(status_code=status.HTTP_302_FOUND,
                                detail=f"Password does not match")
    else:
        raise HTTPException(status_code=status.HTTP_302_FOUND,
                            detail=f"User already exists.")
