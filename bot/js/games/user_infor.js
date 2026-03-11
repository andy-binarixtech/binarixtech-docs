function user_infor() {
    if (!isSocketConnected()) {
        return;
    }
    const msg = G_ZONE_PLUGIN_MSG;
    msg[0] = 6;
    msg[1] = G_ZONE_NAME;
    msg[2] = G_PLUGIN_NAME;
    msg[3] = {
        "action": "user_infor",
        "requestId": generateRequestId(),
        "payload": {}
    };
    socket.send(JSON.stringify(msg));
    log(JSON.stringify(msg), "sent");
}