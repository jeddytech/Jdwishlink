function createEvent() {
  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;

  if (!name || !message) {
    alert("Fill all fields");
    return;
  }

  let id = Math.random().toString(36).substring(2, 8);

  let link = `${window.location.origin}/event.html?id=${id}`;

  document.getElementById("result").innerHTML =
    "Your link: <br><a href='" + link + "' target='_blank'>" + link + "</a>";
}
