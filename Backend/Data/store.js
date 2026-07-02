// In-memory message store
const messages = [];
let nextId = 1;

function getMessages() {
  return messages;
}

function addMessage({ username, text }) {
  const message = {
    id: nextId++,
    username: username || "Anonymous",
    text,
    timestamp: new Date().toISOString(),
  };
  messages.push(message);
  return message;
}

module.exports = { getMessages, addMessage };