const API_BASE = "https://adobopancitlumpia.sslip.io";

export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function postMessage({ username, text }) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}