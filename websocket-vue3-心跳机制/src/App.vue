<template>
  <div>
    <button @click="sendMsg">Send</button>
  </div>
</template>

<script setup>
import Ws from "./Ws";

let ws = null;

function wsConnect() {
  ws = Ws.create("ws://localhost:8000", wsReConnect);
}

function wsReConnect() {
  if (!ws) {
    return wsConnect();
  }
  if (ws && ws.reconnectingTimer) {
    clearTimeout(ws.reconnectingTimer);
    ws.reconnectingTimer = null;
    wsConnect();
  }
}

const sendMsg = () => {
  ws.sendMsg({
    mode: "MESSAGE",
    msg: "Hello",
  });
};

wsConnect();
</script>
