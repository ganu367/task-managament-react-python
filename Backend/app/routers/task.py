from fastapi import APIRouter, Depends, status, HTTPException, Response, Request,Cookie
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import schemas
import models
import string
import random
import secrets
import validators
from typing import Optional
import oauth2
import os
from jose import jwt
from dotenv import dotenv_values, load_dotenv
config = dotenv_values(".env")
connect = load_dotenv()

# SECRET_KEY = os.getenv('SECRET_KEY')
# ALGORITHM_CODE = os.getenv('ALGORITHM')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"


router = APIRouter(prefix="/api", tags=["Task"])


get_db = database.get_db


@router.post("/user/create-task")
def createTask(task_fields: schemas.TaskUpdate, db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
 

                try:
                    new_task = models.TaskModel(
                    title = task_fields.title, desc=task_fields.desc,due_date = task_fields.due_date,priorities = task_fields.priorities)

                    db.add(new_task)
                    db.commit()
                    db.refresh(new_task)

                    return {"status": 200}

                except Exception as e:
                    db.rollback()
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")
                
      

@router.get("/user/get-all-task")
def allTask(db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
   
            
            try:

                all_tasks = db.query(models.TaskModel).filter(models.TaskModel.is_active == True).order_by(models.TaskModel.created_on.desc()).all()

                return {"status": 200,"tasks":all_tasks}
            except Exception as e:
                db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")
       

@router.get("/user/get-task/{task_id}")
def getTask(task_id:int,db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
   
            
            try:

                get_task = db.query(models.TaskModel).filter(
                   models.TaskModel.id==task_id,models.TaskModel.is_active == True).all()

                return {"status": 200,"tasks":get_task}
            except Exception as e:
                db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")



@router.put("/user/update-task/{task_id}")
def updateTask(task_id: int, task_fields: schemas.TaskUpdate, db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
   
                try:

                    db.query(models.TaskModel).filter(models.TaskModel.id == task_id, models.TaskModel.is_active == True).update(
                            {"title":task_fields.title, "desc":task_fields.desc,"due_date":task_fields.due_date,"priorities": task_fields.priorities})

                    db.commit()

                    return {"status": 200}

                except Exception as e:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")


@router.put("/task/delete-task/{task_id}")
def deleteTask(task_id: int, db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
  
            try:

                db.query(models.TaskModel).filter(models.TaskModel.id == task_id, models.TaskModel.is_active == True).update({"is_active": False})
                db.commit()

                return {"Task is deleted"}
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")
