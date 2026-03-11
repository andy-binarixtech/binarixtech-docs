function search_room() {
    if (!G_GROUP_ID) {
        alert('Select group id, please');
        return;
    }
    if (!isSocketConnected()) {
        return;
    }
    const msg = G_ZONE_PLUGIN_MSG;
    msg[0] = 6;
    msg[1] = G_ZONE_NAME;
    msg[2] = G_PLUGIN_NAME;
    msg[3] = {
        "action": "search_room",
        "requestId": generateRequestId(),
        "payload": {
            "groupId": G_GROUP_ID
        }
    };
    socket.send(JSON.stringify(msg));
    log(JSON.stringify(msg), "sent");
}