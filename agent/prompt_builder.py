def build_memory_context(customer_memory):
    summary = customer_memory["summary"]
    open_issues = [
        i for i in customer_memory["issues"]
        if i["status"] != "resolved"
    ]

    context = f"""
Customer Summary:
{summary if summary else "No prior history."}

Open / Pending Issues:
{open_issues if open_issues else "None"}

Rules:
- Do NOT repeat previously attempted solutions
- Focus on unresolved issues
- Ask targeted diagnostic questions
"""
    return context
