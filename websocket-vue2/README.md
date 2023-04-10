### WebSocket原理

#### 聊天室
##### 前端
-   Login
    用户名输入 / 进入聊天室的按钮
    input username(6) -> localStorage -> enter the chatting room
- Home
    列表 / 消息输入框 / 发送按钮
    localstorage -> username / message / id / 消息时间 -> 后端socket服务


    1.open
    2.close
    3.error
    4.message
    
##### 后端
-   接收 -> 消息数据 -> 广播给所有连接到socket服务的客户端
> - webSocket
1.open
2.close
3.error
4.connection
>  4.1- message 接收客户端发送的消息数据 -> 广播

`插件: socket.io  ws  nodejs-websocket`



启动:
chat: npm i
npm run dev
server: npm i
npm run dev