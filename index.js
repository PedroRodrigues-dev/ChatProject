//modules
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Handlebars = require("handlebars");
const handlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const baseRoutes = require("./routes/index");

// Handlebars
app.engine(
  "handlebars",
  handlebars({
    defaulLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", baseRoutes);

let messages = [];

io.on("connection", (socket) => {
  console.log(`Socket conected: ${socket.id}`);

  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

// Others
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Running in http://localhost:" + PORT);
});
