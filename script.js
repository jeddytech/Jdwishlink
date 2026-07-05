import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase.js";

const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", createEvent);

async function createEvent() {

    const eventType = document.getElementById("eventType").value;
    const recipientName = document.getElementById("recipientName").value.trim();
    const eventTitle = document.getElementById("eventTitle").value.trim();
    const eventMessage = document.getElementById("eventMessage").value.trim();
    const eventDate = document.getElementById("eventDate").value;

    if (
        !eventType ||
        !recipientName ||
        !eventTitle ||
        !eventDate
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    try {

        const docRef = await addDoc(
            collection(db, "events"),
            {
                eventType,
                recipientName,
                eventTitle,
                eventMessage,
                eventDate,
                createdAt: serverTimestamp()
            }
        );

        const link =
            `event.html?id=${docRef.id}`;

        document.getElementById("eventLink").innerHTML = `
            <h3>🎉 Celebration Created!</h3>
            <p>Share this link:</p>
            <input
                value="${window.location.origin}${window.location.pathname.replace("index.html","")}${link}"
                readonly
                style="width:100%;padding:12px;">
        `;

        setTimeout(() => {
            window.location.href = link;
        }, 2000);

    } catch (err) {

        console.error(err);
        alert("Failed to create celebration.");

    }

}
