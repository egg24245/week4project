const form = document.getElementById("messageForm");
const messagesDiv = document.getElementById("messages");

const API_URL = "https://guestbook-wy2x.onrender.com/api/messages";

function loadMessages() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      messagesDiv.innerHTML = data
        .map((m) => `<p><strong>${m.name}</strong>: ${m.message}</p>`)
        .join("");
    })
    .catch((err) => {
      messagesDiv.innerHTML = "<p>Failed to load messages.</p>";
      console.error("Load messages error:", err);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to submit message");
      return res.json();
    })
    .then(() => {
      form.reset();
      loadMessages();
    })
    .catch((err) => {
      alert("Error submitting message");
      console.error("Submit error:", err);
    });
});

loadMessages();
