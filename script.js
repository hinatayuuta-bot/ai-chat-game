async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("你：" + text);

    input.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "你是一個冒險遊戲 AI，負責和玩家互動。" },
                { role: "user", content: text }
            ]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    addMessage("AI：" + reply);
}

function addMessage(text) {
    const msgBox = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = text;
    msgBox.appendChild(div);

    msgBox.scrollTop = msgBox.scrollHeight;
      }
