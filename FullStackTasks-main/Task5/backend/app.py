from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel

class Payment(BaseModel):
    amount: float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Update with your MySQL password if needed
        database="payment_system"
    )

@app.post("/pay")
async def pay(payment: Payment):
    amount = payment.amount
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Start transaction
        conn.start_transaction()
        
        # Check user balance
        cursor.execute("SELECT balance FROM accounts WHERE name = 'user'")
        user_balance = cursor.fetchone()[0]
        if user_balance < amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")
        
        # Deduct from user
        cursor.execute("UPDATE accounts SET balance = balance - %s WHERE name = 'user'", (amount,))
        
        # Add to merchant
        cursor.execute("UPDATE accounts SET balance = balance + %s WHERE name = 'merchant'", (amount,))
        
        # Commit
        conn.commit()
        return {"message": "Payment successful"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()