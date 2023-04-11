const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8000 });

server.on("onnection", handleConnection);

function handleConnection(ws) {
  console.log("===Ws已连接===>>>");
  // 服务器关闭时候触发
  ws.on("close", handleClose);
  // 服务器底层错误时候触发
  ws.on("error", handleError);
  // 绑定message事件
  ws.on("message", handleMessage);
}

// ws 关闭
function handleClose(e) {
  console.log("close==>>", e);
  this.send(
    JSON.stringify({
      mode: "MESSAGE",
      msg: "----Ws 已关闭-----",
    })
  );
}

// ws 异常
function handleError(e) {
  console.log("error==>>", e);
}

/**
 * 发送消息
 * @param {*} msg
 */
function handleMessage(data) {
  const { mode, msg } = JSON.parse(data);
  switch (mode) {
    case "MESSAGE":
      console.log("---User Message----");
      this.send(JSON.stringify(JSON.parse(data)));
      break;
    case "HEART_BEAT":
      console.log("---HeartBeat Message----");
      this.send(JSON.stringify(JSON.parse(data)));
      break;
    default:
      break;
  }
}
