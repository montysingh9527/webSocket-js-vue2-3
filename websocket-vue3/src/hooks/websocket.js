// export function useWebSocket() {
// }

import { WS_ADDRESS } from "../configs";
function useWebSocket(handleMessage) {
    const ws = new WebSocket(WS_ADDRESS);
    // 初始化
    const init = () => {
        bindEvent();
    };
    // 事件绑定
    function bindEvent() {
        ws.addEventListener("open", handleOpen, false);
        ws.addEventListener("close", handleClose, false);
        ws.addEventListener("error", handleError, false);
        ws.addEventListener("message", handleMessage, false);
    }
    /**
     * ws连接
     * @param {*} e
     */
    function handleOpen(e) {
        console.log("==ws连接==", e);
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
        console.log("ws报错", e);
    }

    init();
    return ws;
}

export default useWebSocket;
