import { config } from "./config.js";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("你", message);
    userInput.value = "";

    try
