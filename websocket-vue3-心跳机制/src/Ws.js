const WS_MODE = {
  MESSAGE: "MESSAGE",
  HEART_BEAT: "HEART_BEAT",
};

class Ws extends WebSocket {
  constructor(url, wsReConnect) {
    super(url);
    // 连接地址
    this.wsUrl = url;
    this.heartBeatTimer = null;
    this.reconnectingTimer = null;

    this.wsReConnect = wsReConnect;
    this.init();
  }

  /**
   * WS实例化
   * @param {*} url  地址
   * @param {*} wsReConnect  回调函数
   * @returns
   */
  static create(url, wsReConnect) {
    return new Ws(url, wsReConnect);
  }

  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.addEventListener("open", this.handleOpen, false);
    this.addEventListener("close", this.handleClose, false);
    this.addEventListener("error", this.handleError, false);
    this.addEventListener("message", this.handleMessage, false);
  }
  /**
   * ws连接
   * @param {*} e
   */
  handleOpen(e) {
    console.log("==ws连接==", e);
    this.startHeartBeat();
  }

  /**
   * ws关闭
   * @param {*} e
   */
  handleClose(e) {
    console.log("==关闭==e", e);

    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }
    if (this.reconnectingTimer) {
      clearTimeout(this.reconnectingTimer);
      this.reconnectingTimer = null;
    }

    this.reconnect();
  }

  /**
   * ws报错
   * @param {*} e
   */
  handleError(e) {
    console.log("ws报错", e);
  }

  // 消息
  handleMessage(data) {
    const { mode, msg } = this.receiveMsg(data);

    switch (mode) {
      case WS_MODE.HEART_BEAT:
        console.log("----心跳----", msg);
        break;
      case WS_MODE.MESSAGE:
        console.log("----消息----", msg);
        break;
      default:
        break;
    }
  }
  // 心跳执行
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      // ws连接状态
      if (this.readyState === 1) {
        this.sendMsg({
          mode: WS_MODE.HEART_BEAT,
          msg: "HEART_BEAT",
        });
      } else {
        clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = null;
      }
      this.waitForResponse();
    }, 4000);
  }
  /**
   * 重连
   */
  reconnect() {
    this.reconnectingTimer = setTimeout(() => {
      this.wsReConnect();
    }, 3000);
  }

  // 模拟关闭ws
  waitForResponse() {
    setTimeout(() => {
      this.close();
    }, 2000);
  }

  receiveMsg({ data }) {
    return JSON.parse(data);
  }

  sendMsg(data) {
    console.log("======",this.readyState)
    this.readyState === 1 && this.send(JSON.stringify(data));
  }
}

export default Ws;
