from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent.support_agent import SupportAgent
from api.schemas import ChatRequest, ChatResponse

app = FastAPI()
agent = SupportAgent()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import StreamingResponse

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    response = agent.handle_message(
        request.customer_id,
        request.message
    )
    return response

@app.post("/chat_stream")
def chat_stream(request: ChatRequest):
    return StreamingResponse(
        agent.handle_message_stream(request.customer_id, request.message),
        media_type="text/plain"
    )
