from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Fallback to SQLite if MySQL URL is not reachable during standalone testing
db_url = settings.DATABASE_URL
if "mysql" in db_url:
    engine = create_engine(db_url, pool_recycle=3600, pool_pre_ping=True)
else:
    engine = create_engine(db_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
