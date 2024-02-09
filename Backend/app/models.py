from datetime import datetime
from sqlalchemy import Boolean, Column, Integer, String, BIGINT, ForeignKey, DateTime, TIMESTAMP, UniqueConstraint, TEXT, FLOAT, Numeric, CheckConstraint
from database import Base
from sqlalchemy.orm import relationship
current_date = datetime.today()
# format_date = current_date.strftime("%Y-%m-%d")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    username = Column(String, unique=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_by = Column(String)
    created_on = Column(DateTime, default=current_date)
    modified_by = Column(String)
    modified_on = Column(DateTime, default=current_date)

    task = relationship("TaskModel", back_populates="user")

class TaskModel(Base):
    __tablename__ = "task"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey(
        "users.id"))  # refer from user
    title = Column(String)
    desc = Column(String)
    due_date = Column(String)
    priorities = Column(String)
    is_active = Column(Boolean, default=True)
    created_by = Column(String)
    created_on = Column(DateTime, default=current_date)
    modified_by = Column(String)
    modified_on = Column(DateTime, default=current_date)
    user = relationship("User", back_populates="task")

