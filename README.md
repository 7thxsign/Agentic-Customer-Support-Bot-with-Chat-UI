# Customer Support Bot

An agentic AI customer support assistant using Azure OpenAI. This project features a Python backend powered by FastAPI and a modern frontend interface.

## Features

- **Agentic AI:** Uses Azure OpenAI to power an intelligent customer support agent.
- **Modern UI:** Clean and responsive chat interface.
- **Memory:** Contextual memory using JSON storage.
- **Extensible:** Modular design for easy expansion of agent capabilities.

## Setup

### Prerequisites

- Python 3.8+
- Node.js (for frontend development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/7thxsign/Agentic-Customer-Support-Bot-with-Chat-UI.git
   cd Agentic-Customer-Support-Bot-with-Chat-UI
   ```

2. **Create Virtual Environment:**
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Credentials:**
   Open `config/settings.py` and update the following variables with your Azure OpenAI credentials:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_DEPLOYMENT_NAME`
   - `API_VERSION`

## Usage

### Run the Backend

Start the FastAPI server:
```bash
python main.py
```
The server will start at `http://localhost:8000`.

### Run the Frontend

Navigate to the frontend directory and start the development server:
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

- `agent/`: Core agent logic and tools.
- `api/`: FastAPI routes and endpoints.
- `config/`: Configuration settings.
- `data/`: Local data storage (e.g., memory_store.json).
- `frontend/`: React/Vite frontend application.
- `main.py`: Application entry point.

## License

MIT
