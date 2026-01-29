from agent.support_agent import SupportAgent

agent = SupportAgent()
customer_id = "customer_001"

print("Customer Support Bot (type 'exit' to quit)\n")

while True:
    user_input = input("Customer: ")
    if user_input.lower() == "exit":
        break

    response = agent.handle_message(customer_id, user_input)
    print("Bot:", response)
