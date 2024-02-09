# SQLALCHEMY_DATABASE_URL = 'postgresql+psycopg2://fastapiganu:brandly#1234@fastapi-database.postgres.database.azure.com/brandly_url?sslmode=require'
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL,connect_args={"check_same_thread": False}
# )
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

 # response = RedirectResponse(
            #     url='/dashboard', status_code=status.HTTP_302_FOUND)


# @router.put("/user/update-task/{task_id}")
# def updateTask(task_id: int, task_fields: schemas.TaskUpdate, db: Session = Depends(get_db),access_token: Optional[str] = Cookie(None)):
#     # if access_token is None:
#     #     # return RedirectResponse("/login")
#     #     return "you need to login"
#     # else :
    
#     #     token_value = access_token.replace("Bearer ", "")
#     #     user_info = jwt.decode(token_value, SECRET_KEY, algorithms=['HS256'])

#     #     username = user_info["user"]["username"]
#     #     print(username)

#     #     get_user = db.query(models.User).filter(
#     #         models.User.username == username)

#     #     get_task= db.query(models.TaskModel).filter(
#     #         models.TaskModel.id == task_id, models.TaskModel.user_id == get_user.first().id, models.TaskModel.is_active == True)

#     #     if not get_task.first():
#     #         raise HTTPException(
#     #             status_code=status.HTTP_404_NOT_FOUND, detail="not found")

#     #     else:
#     #         if (get_user.first().is_active == True):

#                 try:

#                     db.query(models.TaskModel).filter(models.TaskModel.id == task_id, models.TaskModel.is_active == True).update(
#                             {"title":task_fields.title, "desc":task_fields.desc,"due_date":task_fields.due_date,"priorities": task_fields.priorities})

#                     db.commit()

#                     return {"status": 200}

#                 except Exception as e:
#                     raise HTTPException(
#                         status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e.orig}")

#             # else:
#             #     raise HTTPException(
#             #         status_code=status.HTTP_400_BAD_REQUEST, detail=f"User not found")
