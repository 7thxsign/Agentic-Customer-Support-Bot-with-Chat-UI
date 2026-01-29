from openai import AzureOpenAI
from config.settings import *

client = AzureOpenAI(
    api_key=AZURE_OPENAI_API_KEY,
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_version=API_VERSION
)

SYSTEM_PROMPT = """
You are a highly professional customer support AI assistant.
Your goal is to resolve customer issues efficiently and accurately.

Communication Guidelines:
- Tone: Formal, polite, and objective.
- NO EMOJIS: Do not use emojis or emoticons under any circumstances.
- Formatting: Use clear, structured formatting (paragraphs, bullet points) for readability.
- Conciseness: Be direct and avoid unnecessary small talk.
"""

def get_response(memory_context, user_input):
    response = client.chat.completions.create(
        model=AZURE_DEPLOYMENT_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": memory_context},
            {"role": "user", "content": user_input}
        ],
    )
    return response.choices[0].message.content

def get_response_stream(memory_context, user_input):
    return client.chat.completions.create(
        model=AZURE_DEPLOYMENT_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": memory_context},
            {"role": "user", "content": user_input}
        ],
        stream=True
    )
