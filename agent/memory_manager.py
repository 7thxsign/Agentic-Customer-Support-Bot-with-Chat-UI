import uuid

def create_issue(description):
    return {
        "issue_id": str(uuid.uuid4())[:8],
        "description": description,
        "status": "open",
        "attempts": [],
        "pending_followup": True
    }

def update_summary(summary, user_input, bot_reply):
    return summary + f"\nUser: {user_input}\nBot: {bot_reply}"

def mark_attempt(issue, attempt):
    issue["attempts"].append(attempt)
    issue["status"] = "in_progress"

def resolve_issue(issue):
    issue["status"] = "resolved"
    issue["pending_followup"] = False
