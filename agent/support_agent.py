from agent.memory_store import (
    load_all_memory,
    save_all_memory,
    get_customer_memory
)
from agent.memory_manager import (
    create_issue,
    update_summary,
    mark_attempt
)
from agent.prompt_builder import build_memory_context
from agent.llm_client import get_response, get_response_stream

class SupportAgent:

    def handle_message(self, customer_id, user_input):
        all_memory = load_all_memory()
        customer_memory = get_customer_memory(customer_id)

        # If no issues exist, create one
        if not customer_memory["issues"]:
            customer_memory["issues"].append(
                create_issue(user_input)
            )

        memory_context = build_memory_context(customer_memory)

        reply = get_response(memory_context, user_input)

        # Track attempt on latest open issue
        issue = next(
            i for i in customer_memory["issues"]
            if i["status"] != "resolved"
        )
        mark_attempt(issue, reply)

        customer_memory["summary"] = update_summary(
            customer_memory["summary"],
            user_input,
            reply
        )

        all_memory[customer_id] = customer_memory
        save_all_memory(all_memory)

        return {
            "reply": reply,
            "status": issue["status"]
        }

    def handle_message_stream(self, customer_id, user_input):
        all_memory = load_all_memory()
        customer_memory = get_customer_memory(customer_id)

        # 1. Update issue/state upfront
        if not customer_memory["issues"]:
            customer_memory["issues"].append(
                create_issue(user_input)
            )
        
        memory_context = build_memory_context(customer_memory)
        stream = get_response_stream(memory_context, user_input)

        full_reply = ""
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_reply += content
                yield content

        # 2. Update memory AFTER full response is generated
        issue = next(
            i for i in customer_memory["issues"]
            if i["status"] != "resolved"
        )
        mark_attempt(issue, full_reply)
        
        customer_memory["summary"] = update_summary(
            customer_memory["summary"],
            user_input,
            full_reply
        )
        all_memory[customer_id] = customer_memory
        save_all_memory(all_memory)

        # Yield status at the very end as a special event or handle via simple accumulation
        # Because this is a simple text stream, status is implicit for now or must be handled.
        # For simplicity, we stick to text stream. Status update happens in background.
