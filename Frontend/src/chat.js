import { fetchMessages, postMessage } from "./api.js";
import { renderMessages, scrollToBottom } from "./ui.js";

const POLL_INTERVAL = 3000; // ms

export function initChat() {
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const usernameInput = document.getElementById("username-input");

  // Restore username from sessionStorage
  usernameInput.value = sessionStorage.getItem("chat-username") || "";
  usernameInput.addEventListener("change", () => {
    sessionStorage.setItem("chat-username", usernameInput.value.trim());
  });

  function getUsername() {
    return usernameInput.value.trim() || "Anonymous";
  }

  async function loadAndRender() {
    try {
      const messages = await fetchMessages();
      renderMessages(messages, getUsername());
    } catch (err) {
      console.error("Polling error:", err);
    }
  }

  async function handleSend() {
    const text = messageInput.value.trim();
    if (!text) return;

    sendButton.disabled = true;
    messageInput.disabled = true;

    try {
      await postMessage({ username: getUsername(), text });
      messageInput.value = "";
      await loadAndRender();
      scrollToBottom();
    } catch (err) {
      console.error("Send error:", err);
      alert("Failed to send message. Is the server running?");
    } finally {
      sendButton.disabled = false;
      messageInput.disabled = false;
      messageInput.focus();
    }
  }

  // Send on button click
  sendButton.addEventListener("click", handleSend);

  // Send on Enter key
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Initial load + start polling
  loadAndRender();
  setInterval(loadAndRender, POLL_INTERVAL);
}