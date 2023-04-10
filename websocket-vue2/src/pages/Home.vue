<template>
  <div class="home">
    <ul>
      <li v-for="item of msgList" :key="item.id">
        <p>用户: {{ item.user }}</p>
        <p>时间: {{ new Date(item.dateTime).toLocaleString() }}</p>
        <p>消息: {{ item.msg }}</p>
      </li>
    </ul>
    <div class="q-ma-md">
      <input type="text" placeholder="请输入消息" v-model="msg" />
      <button @click="handleSendBtnClick">发送</button>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:8000");

export default {
  name: "Home",
  data() {
    return {
      msg: "",
      username: "",
      msgList: [],
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    if (!this.username) {
      this.$router.push("/login");
      return;
    }
    ws.addEventListener("open", this.handleWsOpen.bind(this), false);
    ws.addEventListener("close", this.handleWsClose.bind(this), false);
    ws.addEventListener("error", this.handleWsError.bind(this), false);
    ws.addEventListener("message", this.handleWsMessage.bind(this), false);
  },
  methods: {
    // 发送消息
    handleSendBtnClick() {
      const msg = this.msg;
      if (!msg.trim().length) {
        return;
      }

      // 转成json字符串
      ws.send(
        JSON.stringify({
          id: Date.now(),
          user: this.username,
          dateTime: new Date().getTime(),
          msg: this.msg,
        })
      );
      // 发送完成清空输入框
      this.msg = "";
    },
    handleWsOpen(e) {
      console.log("连接ws==>>", e);
    },
    handleWsClose(e) {
      console.log("关闭ws==>>", e);
    },
    handleWsError(e) {
      console.log("错误ws==>>", e);
    },
    handleWsMessage(e) {
      const msg = JSON.parse(e.data);
      this.msgList.push(msg);
      console.log("发送消息ws==>>", e.data);
    },
  },
};
</script>
