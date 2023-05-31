const Pusher = require("pusher-js"); // Import
const PusherAppKey = "abe185cdca80fe92b3cb";

const pusher = new Pusher(PusherAppKey, {
  cluster: "us2",
  encrypted: true,
  forceTLS: true,
});

pusher.connection.bind("connected", () => {
  console.log("Websocket Connected");
});

pusher.connection.bind("unavailable", () => {
  console.log("Websocket Disconnected");
});

const channel = pusher.subscribe("638565e6d7de0e96c3576e72"); // Store ID

channel.bind("new-order", function(data) {
  console.log(`Received a new order:`);
  console.log(JSON.stringify(data));
});