const socket = io("http://localhost:8000"); // The / namespace
const socket1 = io("http://localhost:8000/admin"); //the /admin namespace
const socket2 = io("http://localhost:8000/marketing"); //the /marketing namespace

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "This is from the Client" });
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  //Prevent Form from utomatic Submission
  e.preventDefault();
  let inputBox = document.querySelector("#user-message");
  const newMessage = inputBox.value;

  socket.emit("newMessageToServer", { text: newMessage });
  inputBox.value = "";
});

socket.on("messageToClients", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});

//Admin namespace
socket1.on("connect", () => {
  console.log(socket1.id);
});

socket1.on("welcome", (msg) => {
  console.log(msg);
});

socket1.on("Server welcome", (msg) => {
  console.log(msg);
});
