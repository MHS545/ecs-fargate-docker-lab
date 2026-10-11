// Base URL of the Flask backend.
// This is a plain constant for now (running locally). When this project is
// containerized later, this can be changed to point to the backend's
// service name/port inside the Docker network.
const BACKEND_URL = "http://13.222.151.83:5000";

const textInput = document.getElementById("textInput");
const enterButton = document.getElementById("enterButton");
const statusMessage = document.getElementById("statusMessage");

// Allow submitting with the Enter key as well as the button.
textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveText();
    }
});

enterButton.addEventListener("click", saveText);

async function saveText() {
    const text = textInput.value.trim();

    if (!text) {
        showStatus("Please enter some text first.", "error");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            showStatus(data.error || "Something went wrong.", "error");
            return;
        }

        showStatus(data.message || "Saved successfully", "success");
        textInput.value = "";
        textInput.focus();
    } catch (error) {
        console.error("Error saving text:", error);
        showStatus("Could not reach the server.", "error");
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}
