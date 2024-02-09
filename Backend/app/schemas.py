from datetime import datetime
from typing import Optional, Union
from pydantic import BaseModel, EmailStr, Field
from typing import List


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    username: EmailStr
    password: str
    confirm_password: str

    class config:

        orm_mode = True



class Task(BaseModel):
    title: Optional[str]
    due_date: str


class TaskUpdate(Task):
    desc:str
    priorities:str

    class config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user: Union[dict, None] = None
