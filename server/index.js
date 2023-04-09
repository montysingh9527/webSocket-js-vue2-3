const Ws = require("ws");

((Ws) => {
  // 实例化    ws:localhost:8000
  const server = new Ws.Server({ port: 8000 });
  /**
   * 初始化
   */
  const init = () => {
    bindEvent();
  };

  /**
   * 事件绑定
   */
  function bindEvent() {
    // 当服务器建立连接的时候触发
    server.on("open", handleOpen);
    // 服务器关闭时候触发
    server.on("close", handleClose);
    // 服务器底层错误时候触发
    server.on("error", handleError);
    // 客户端和服务器握手完成后触发
    server.on("connection", handleConnection);
  }

  // ws 打开
  function handleOpen() {
    console.log("open");
  }

  // ws 关闭
  function handleClose() {
    console.log("close");
  }

  // ws 异常
  function handleError() {
    console.log("error");
  }

  /**
   * 连接ws
   * @param {*} ws
   */
  function handleConnection(ws) {
    console.log("连接ws");
    // 绑定message事件
    ws.on("message", handleMessage);
  }
  /**
   * 发送消息
   * @param {*} msg
   */
  function handleMessage(msg) {
    const msgdata = JSON.parse(msg);
    console.log("==接收消息==", JSON.parse(msg));
    // clients: 一个Set对象保存了服务器所有的已建立的连接对象,只有在Server的构造函数中clientTracking为True的时候才有效.
    server.clients.forEach(function (c) {
      c.send(JSON.stringify(msgdata));
    });
  }
  init();
})(Ws);
