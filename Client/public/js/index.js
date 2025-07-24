let username = window.localStorage.getItem("username");
if (!username) window.location.href = "/login";

const socket = io("http://localhost:4000");
const userSelect = document.getElementById("userSelect");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

socket.emit("new user", { username });

function handleRenderUsers(users) {
    userSelect.innerHTML = '<option value="">Foydalanuvchi tanlang</option>';
    for (let key in users) {
        if (key !== username) {
            let option = document.createElement("option");
            option.value = users[key];
            option.textContent = key;
            userSelect.appendChild(option);
        }
    }
}

socket.on("connected", ({ username: joinUserName, users }) => {
    handleRenderUsers(users);
    const messageElement = document.createElement("div");
    messageElement.className = "text-sm text-gray-600 italic";
    messageElement.textContent = joinUserName === username ? "Siz chatga qo'shildingiz!" : `${joinUserName} chatga qo'shildi`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

sendButton.addEventListener("click", () => {
    const val = messageInput.value.trim();
    if (val) {
        const message = {
            from: username,
            message: val
        };
        socket.emit("new message", message);
        messageInput.value = "";
    }
});

socket.on("message", ({ from, val }) => {
    const messageElement = document.createElement("div");
    messageElement.className = `p-2 rounded-md ${from === username ? "bg-blue-100 ml-auto" : "bg-gray-200 mr-auto"} max-w-xs`;
    messageElement.innerHTML = `<span class="font-bold">${from}:</span> ${val}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});