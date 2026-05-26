const messageList = document.getElementById("message-list");
const chatContainer = document.querySelector(".chat-container");

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function renderMessages(messages, currentUsername) {
  if (messages.length === 0) {
    messageList.innerHTML = `
      <li class="empty-state">
        <span>💬</span>
        <p>No messages yet.</p>
        <small>Be the first to say something!</small>
      </li>`;
    return;
  }

  // Only re-render if count changed (avoids flicker)
  if (messageList.children.length === messages.length) return;

  const wasAtBottom = isScrolledToBottom();

  messageList.innerHTML = messages
    .map((msg) => {
      const isSelf = msg.username === currentUsername && currentUsername.trim() !== "";
      const side = isSelf ? "self" : "other";
      return `
        <li class="message-item ${side}">
          <span class="message-username">${escapeHtml(msg.username)}</span>
          <div class="message-bubble">${escapeHtml(msg.text)}</div>
          <span class="message-time">${formatTime(msg.timestamp)}</span>
        </li>`;
    })
    .join("");

  if (wasAtBottom) scrollToBottom();
}

export function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function isScrolledToBottom() {
  const { scrollTop, scrollHeight, clientHeight } = chatContainer;
  return scrollHeight - scrollTop - clientHeight < 80;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}