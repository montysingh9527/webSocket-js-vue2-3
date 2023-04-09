/**
 * 都是window上面的 document, localStorage, location
 */

((doc, storage, location) => {
  const oUsername = doc.querySelector("#username");
  const oEnterBtn = doc.querySelector("#enter");
  // 初始化
  const init = () => {
    bindEvent();
  };
  // 事件绑定
  function bindEvent() {
    oEnterBtn.addEventListener("click", handleEnterBtnClick, false);
  }

  // 点击事件
  function handleEnterBtnClick() {
    const username = oUsername.value.trim();

    if (username.length < 6) {
      alert("用户名不小于6位");
      return;
    }
    storage.setItem("username", username);
    // 跳转发送消息页面
    location.href = "index.html";
  }

  init();
})(document, localStorage, location);
