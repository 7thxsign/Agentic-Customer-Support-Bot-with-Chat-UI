import json
from pathlib import Path

MEMORY_FILE = Path("data/memory_store.json")

def load_all_memory():
    if MEMORY_FILE.exists():
        with open(MEMORY_FILE, "r") as f:
            return json.load(f)
    return {}

def save_all_memory(memory):
    MEMORY_FILE.parent.mkdir(exist_ok=True)
    with open(MEMORY_FILE, "w") as f:
        json.dump(memory, f, indent=2)

def get_customer_memory(customer_id):
    memory = load_all_memory()
    return memory.get(customer_id, {
        "summary": "",
        "issues": []
    })
