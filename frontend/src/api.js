export async function sendMessage(customerId, message) {
    const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            customer_id: customerId,
            message: message,
        }),
    })
    return response.json()
}
