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

  if (!eventType || !recipientName || !eventTitle || !eventDate) {
    alert("Please complete all required fields.");
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
      `${window.location.origin}${window.location.pathname.replace("index.html","")}event.html?id=${docRef.id}`;

    document.getElementById("eventLink").innerHTML = `
      <p><strong>Your celebration page is ready!</strong></p>
      <a href="${link}" target="_blank">${link}</a>
    `;

  } catch (error) {

    console.error(error);
    alert("Unable to create event.");

  }

                                                                   }
