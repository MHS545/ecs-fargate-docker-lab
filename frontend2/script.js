// Base URL of the Flask backend.
// This is a plain constant for now (running locally). When this project is
// containerized later, this can be changed to point to the backend's
// service name/port inside the Docker network.
const BACKEND_URL = "http://13.222.151.83:5000";

const showAllButton = document.getElementById("showAllButton");
const messagesList = document.getElementById("messagesList");
const statusMessage = document.getElementById("statusMessage");

showAllButton.addEventListener("click", loadMessages);

async function loadMessages() {
    statusMessage.textContent = "";
    messagesList.innerHTML = "";

    try {
        const response = await fetch(`${BACKEND_URL}/api/messages`);

        if (!response.ok) {
            statusMessage.textContent = "Could not load messages.";
            return;
        }

        const messages = await response.json();

        if (messages.length === 0) {
            statusMessage.textContent = "No messages saved yet.";
            return;
        }

        messages.forEach((item) => {
            const listItem = document.createElement("li");

            const textSpan = document.createElement("span");
            textSpan.textContent = item.text;

            const timeSpan = document.createElement("span");
            timeSpan.className = "timestamp";
            timeSpan.textContent = formatDate(item.createdAt);

            listItem.appendChild(textSpan);
            listItem.appendChild(timeSpan);
            messagesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading messages:", error);
        statusMessage.textContent = "Could not reach the server.";
    }
}

function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString();
}
