<template>
  <div class="chatting q-ma-md">
    <ul>
      <template v-for="userInfo of state.userList" :key="userInfo.id">
        <li v-if="userInfo.username === state.username">
          {{ userInfo.username }}
        </li>
        <li v-else>
          <a @click="selectUser(userInfo)" href="javascript:;">{{
            userInfo.username
          }}</a>
        </li>
      </template>
    </ul>
    <div v-if="state.targetUser">
      <h3>{{ state.targetUser.username }}</h3>
      <input type="text" placeholder="Input some..." v-model="state.msgText" />
      <button @click="sendMessage">发送</button>
    </div>
    <div>
      <ul>
        <li v-for="(item, index) of messageList" :key="index">
          <p>{{ item.fromUsername }}：{{ new Date(item.dateTime) }}</p>
          <p>{{ item.msg }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
import { useRouter } from "vue-router";
import { computed, reactive } from "vue";

const router = useRouter();

const state = reactive({
  username: router.currentRoute.value.query.username,
  // 用户列表
  userList: [],
  // 选择的用户
  targetUser: null,
  // 发送消息
  msgText: "",
  // 消息对象
  messageBox: {},
});

// 计算用户对应的消息
const messageList = computed(() => {
  return state.messageBox[state.username] && state.targetUser
    ? state.messageBox[state.username].filter((item) => {
        return (
          item.fromUsername === state.targetUser.username ||
          item.toUsername === state.targetUser.username
        );
      })
    : [];
});

const socket = io("http://localhost:3000", {
  query: {
    username: state.username,
  },
});

// 选择用户
const selectUser = (userInfo) => {
  state.targetUser = userInfo;
};

/**
 * 发送消息
 * {
 *    vic: [{
 *          fromUsername: xxx,
 *          toUsername: xxx,
 *          dateTime: xxx,
 *          msg: xxx
 *    }]
 * }
 */
const sendMessage = () => {
  if (!state.msgText.length) return;
  appendMessage({
    fromUsername: state.targetUser.username,
    toUsername: state.targetUser.username,
    msg: state.msgText,
    dateTime: new Date().getTime(),
  });
  socket.emit("send", {
    fromUsername: state.username,
    targetId: state.targetUser.id,
    msg: state.msgText,
  });
  // 清空输入框
  state.msgText = "";
};

socket.on("online", (data) => {
  console.log("===data===", data);
  state.userList = data.userList;
});

socket.on("receive", (data) => {
  appendMessage(data);
});

socket.on("error", (err) => {
  console.log(err);
});

function appendMessage(data) {
  !state.messageBox[state.username] && (state.messageBox[state.username] = []);
  state.messageBox[state.username].push(data);
}
</script>

<style scoped lang="scss">
</style>
