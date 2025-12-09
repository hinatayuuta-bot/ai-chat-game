// --- AI 奇幻冒險遊戲版本 script.js --- //

async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("你：" + text);
    input.value = "";

    // AI 輸出
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                // ----------- 系統劇情設定（主線整合版） ----------- //
                {
                    role: "system",
                    content: `
你是 AI 奇幻冒險遊戲敘事系統，將引導玩家完成約 1 小時內能通關的冒險。

遊戲章節：
序章 → 第一章：枯星森林 → 第二章：墜星之谷 → 第三章：核心殿堂 → 結局（4 種）。

世界觀：
星之核心破碎，碎片散落世界。玩家是「命途之印」的持有者，能重鑄核心。

重要角色：
1. 雷歐 Leon：騎士，直率勇敢，可選戀愛線。
2. 艾莉雅 Aria：精靈法師，冷靜聰明，也可選戀愛線。
3. 核心守護靈：最終章會出現，不一定是敵人。

遊戲規則：
- 每次回覆限制 80–150 字，保持節奏明確。
- 玩家能自由輸入任何行動，例如：攻擊、閃避、說話、探索、使用魔力、調情。
- 玩家行動會影響：隊友好感度、事件結果、結局走向。
- 若玩家想浪漫支線，會自然觸發，不強制。
- 依照玩家進度，自動推動主線章節。
- 戰鬥需玩家選動作才能前進。
- 愛情線不會干擾主線，但可影響個別角色的結局。

請從「序章：命途之印覺醒」開始，帶玩家進故事。
提供對話 + 敘事 + 行動選項，但不幫玩家決定行動。
`
                },
                // 玩家輸入
                { role: "user", content: text }
            ]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    addMessage("AI：" + reply);
}

// 顯示訊息
function addMessage(text) {
    const msgBox = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = text;
    msgBox.appendChild(div);

    msgBox.scrollTop = msgBox.scrollHeight;
}
