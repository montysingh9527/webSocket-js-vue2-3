const express = require("express");
const app = express();

const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:8080"],
    credentials: true

  },
});

const userList = [];
io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  if (!username) return;
  /**
   * {
   *   username: XXX,
   *   id: XXX
   * }
   */
  const userInfo = userList.find((user) => user.username === username);
  if (userInfo) {
    userInfo.id = socket.id;
  } else {
    userList.push({
      id: socket.id,
      username,
    });
  }
  io.emit("online", {
    userList,
  });

  socket.on("send", ({ fromUsername, targetId, msg }) => {
    // 查找到当前用户id，用当前用户的socket发送消息
    const targetSocket = io.sockets.sockets.get(targetId);
    const toUser = userList.find((user) => user.id === targetId);
    console.log("===fromUsername===",fromUsername, targetId, msg)
    targetSocket.emit("receive", {
      fromUsername,
      toUsername: toUser.username,
      msg,
      dateTime: new Date().getTime(),
    });
  });
});


app.get("/*", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.listen(8080, () => {
  console.log("OK...");
});
