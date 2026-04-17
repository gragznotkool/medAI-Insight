from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./medai.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class DiagnosticRecord(Base):
    __tablename__ = "diagnostic_records"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    input_notes = Column(Text, nullable=False)
    predictions = Column(Text, nullable=False) # Store JSON string of predictions
    risk_level = Column(String, default="Low")

# Create all tables
Base.metadata.create_all(bind=engine)
