function get_game_list() {
    if (!isSocketConnected()) {
        return;
    }
    const msg = G_ZONE_PLUGIN_MSG;
    msg[0] = 6;
    msg[1] = G_ZONE_NAME;
    msg[2] = G_PLUGIN_NAME;
    msg[3] = {
        "action": "get_game_list",
        "requestId": generateRequestId(),
        "payload": {}
    };
    socket.send(JSON.stringify(msg));
    log(JSON.stringify(msg), "sent");
}