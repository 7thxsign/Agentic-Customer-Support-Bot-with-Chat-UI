from pydantic import BaseModel

class ChatRequest(BaseModel):
    customer_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    status: str
