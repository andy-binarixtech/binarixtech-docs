function login(zoneName) {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (!isSocketConnected()) {
        return;
    }
    if (getZones(zoneName)) {
        G_ZONE_NAME = getZones(zoneName).zoneId;
        G_PLUGIN_NAME = getZones(zoneName).pluginId;
    }
    if (userName == '') {
        userName = createUserId();
    }
    data = {
        bnrToken: ''
    };
    if (G_BNR_TOKEN) {
        data.bnrToken = G_BNR_TOKEN;
    }
    const loginMessage = [1,zoneName,userName,password,data];

    const msg = loginMessage;
    socket.send(JSON.stringify(msg));
    log("Login message: " + JSON.stringify(msg));
}

function join_game(zoneName) {
    const userName = document.getElementById("userName").value;

    if (!isSocketConnected()) {
        return;
    }
    if (getZones(zoneName)) {
        G_ZONE_NAME = getZones(zoneName).zoneId;
        G_PLUGIN_NAME = getZones(zoneName).pluginId;
    }
    if (userName == '') {
        userName = createUserId();
    }
    data = {
        bnrToken: G_BNR_TOKEN
    };
    const loginMessage = [1,zoneName,userName,password,data];

    const msg = loginMessage;
    socket.send(JSON.stringify(msg));
    log("Login message: " + JSON.stringify(msg));
}