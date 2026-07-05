import {
  db,
  doc,
  getDoc,
  collection,
  addDoc,
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

async function loadEvent() {

    if (!eventId) {
        eventTitle.textContent = "Event Not Found";
        return;
    }

    const ref = doc(db, "events", eventId);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
        eventTitle.textContent = "Celebration Not Found";
        return;
    }

    const data = snap.data();

    eventTitle.textContent = data.eventTitle;

    eventInfo.textContent =
        `${data.eventType} • ${data.recipientName} • ${data.eventDate}`;
}

loadEvent();

sendWish.addEventListener("click", async () => {

    if (
        guestName.value.trim() === "" ||
        guestMessage.value.trim() === ""
    ) {
        alert("Please complete all fields.");
        return;
    }

    await addDoc(
        collection(db, "events", eventId, "wishes"),
        {
            name: guestName.value,
            message: guestMessage.value,
            createdAt: serverTimestamp()
        }
    );

    guestName.value = "";
    guestMessage.value = "";

    alert("Your message has been sent ❤️");
});
