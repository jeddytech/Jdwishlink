import {
  db,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "./firebase.js";

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const eventTitle = document.getElementById("eventTitle");
const eventInfo = document.getElementById("eventInfo");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const sendWish = document.getElementById("sendWish");
const messages = document.getElementById("messages");

// Load event details
async function loadEvent() {
    if (!eventId) {
        eventTitle.textContent = "Event not found";
        return;
    }

    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
        eventTitle.textContent = "Celebration not found";
        return;
    }

    const data = eventSnap.data();

    eventTitle.textContent = data.eventTitle;
    eventInfo.textContent =
        `${data.eventType} • ${data.recipientName} • ${data.eventDate}`;
}

// Listen for wishes in real time
function loadMessages() {

    const wishesRef = collection(db, "events", eventId, "wishes");

    const q = query(
        wishesRef,
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {

        messages.innerHTML = "";

        if (snapshot.empty) {
            messages.innerHTML =
                "<p>No messages yet. Be the first to leave one! ❤️</p>";
            return;
        }

        snapshot.forEach((doc) => {

            const wish = doc.data();

            messages.innerHTML += `
                <div class="wish-card">
                    <h3>${wish.name}</h3>
                    <p>${wish.message}</p>
                </div>
            `;
        });

    });

}

// Submit a wish
sendWish.addEventListener("click", async () => {

    if (
        guestName.value.trim() === "" ||
        guestMessage.value.trim() === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    await addDoc(
        collection(db, "events", eventId, "wishes"),
        {
            name: guestName.value.trim(),
            message: guestMessage.value.trim(),
            createdAt: serverTimestamp()
        }
    );

    guestName.value = "";
    guestMessage.value = "";
});

loadEvent();
loadMessages();
