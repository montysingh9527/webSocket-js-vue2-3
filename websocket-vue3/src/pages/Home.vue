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
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket } from "../hooks/index";

export default {
  name: "Home",
  setup(props, ctx) {
    const router = useRouter();
    const ws = useWebSocket(handleMessage);
    const state = reactive({
      msg: "",
      msgList: [],
    });

    let username = "";

    onMounted(() => {
      username = localStorage.getItem("username");
      if (!username) {
        router.push("/login");
        return;
      }
    });

    // 发送消息
    const handleSendBtnClick = () => {
      const _msg = state.msg;
      if (!_msg.trim().length) {
        return;
      }

      ws.send(
        JSON.stringify({
          id: new Date().getTime(),
          user: username,
          dateTime: Date.now(),
          msg: state.msg,
        })
      );
      state.msg = "";
    };
    // 发送消息
    function handleMessage(e) {
      const _msgData = JSON.parse(e.data);
      console.log("===发送消息===>>",_msgData)
      state.msgList.push(_msgData);
    }
    return {
      ...toRefs(state),
      handleSendBtnClick,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
