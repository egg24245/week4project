const form = document.getElementById("messageForm");
const messagesDiv = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) return;

  fetch("http://localhost:8080/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  }).then(() => {
    form.reset();
    loadMessages();
  });
});

function loadMessages() {
  fetch("http://localhost:8080/api/messages")
    .then((res) => res.json())
    .then((data) => {
      messagesDiv.innerHTML = data
        .map((m) => `<p><strong>${m.name}</strong>: ${m.message}</p>`)
        .join("");
    });
}

loadMessages();
