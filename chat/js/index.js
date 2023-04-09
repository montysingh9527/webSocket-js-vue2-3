/**
 * 都是window上面的 document, WebSocket, localStorage
 */
((doc, Socket, storage) => {
  const oList = doc.querySelector("#list");
  const oMsg = doc.querySelector("#message");
  const oSendBtn = doc.querySelector("#send");
  // 实例化ws
  const ws = new Socket("ws:localhost:8000");

  let username = "";

  // 初始化
  const init = () => {
    bindEvent();
  };
  // 事件绑定
  function bindEvent() {
    oSendBtn.addEventListener("click", handleSendBtnClick, false);
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  }

  /**
   * 点击按钮发送消息
   * @returns 
   */
  function handleSendBtnClick() {
    const msg = oMsg.value;
    if (!msg.trim().length) {
      return;
    }
    // 转成json字符串
    ws.send(
      JSON.stringify({
        user: username,
        dateTime: new Date().getTime(),
        message: msg,
      })
    );
    // 发送完成清空输入框
    oMsg.value = "";
  }

  /**
   * ws连接
   * @param {*} e
   */
  function handleOpen(e) {
    console.log("==ws连接==", e);
    username = storage.getItem("username");
    if (!username) {
      location.href = "entry.html";
      return;
    }
  }

  /**
   * ws关闭
   * @param {*} e
   */
  function handleClose(e) {
    console.log("==关闭==e", e);
  }

  /**
   * ws报错
   * @param {*} e
   */
  function handleError(e) {
    console.log("ws报错", e)
  }

  /**
   * ws发送消息
   * @param {*} e
   */
  function handleMessage(e) {
    const msgData = JSON.parse(e.data);
    oList.appendChild(createMsg(msgData));
    
    console.log("ws发送消息",msgData)
  }

  /**
   * 渲染模板
   * @param {*} data 
   * @returns 
   */
  function createMsg(data) {
    const { user, dateTime, message } = data;
    const oItem = doc.createElement("li");
    oItem.innerHTML = `
        <p>
            <span>用户: ${ user }</span>
            <i>${ new Date(dateTime).toLocaleString() }</i>
        </p>
        <p>消息: ${ message }</p>
    `
    return oItem;
  }
  init();
})(document, WebSocket, localStorage);
