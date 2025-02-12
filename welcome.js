const firebaseConfig = {
    apiKey: "AIzaSyD1j2jZemTd21wo4k1qctyfgsDDfaX-XL8",
    authDomain: "chatnow-d053e.firebaseapp.com",
    projectId: "chatnow-d053e",
    storageBucket: "chatnow-d053e.firebasestorage.app",
    messagingSenderId: "222972944786",
    appId: "1:222972944786:web:712834d91384ff1e08214b",
    measurementId: "G-7GL9JVGPLZ"
  };
  // In
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addUser() {
    const email = prompt("Enter email to add:");
    if (email) {
        // Check if user exists in Firestore
        db.collection("users").doc(email).get().then(doc => {
            if (doc.exists) {
                const chatList = document.getElementById("chatList");
                
                // Prevent duplicate entries
                if ([...chatList.children].some(li => li.textContent === email)) {
                    alert("User already added!");
                    return;
                }

                const li = document.createElement("li");
                li.textContent = email;
                li.onclick = () => openChat(email);
                chatList.appendChild(li);
            } else {
                alert("User is not registered!");
            }
        }).catch(error => {
            console.error("Error checking user:", error);
        });
    }
}


function openChat(email) {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("chatArea").classList.add("active");
    document.getElementById("chatHeader").textContent = "Chat with " + email;
    document.getElementById("chatBody").innerHTML = "";

    db.collection("chats").doc(email).collection("messages").orderBy("timestamp")
    .onSnapshot(snapshot => {
        const chatBody = document.getElementById("chatBody");
        chatBody.innerHTML = "";
        snapshot.forEach(doc => {
            const messageElement = document.createElement("p");
            messageElement.textContent = doc.data().sender + ": " + doc.data().message;
            chatBody.appendChild(messageElement);
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();
    if (messageText) {
        const email = document.getElementById("chatHeader").textContent.replace("Chat with ", "");
        db.collection("chats").doc(email).collection("messages").add({
            sender: "You",
            message: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = "";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function goBack() {
    document.getElementById("sidebar").style.display = "flex";
    document.getElementById("chatArea").classList.remove("active");
}