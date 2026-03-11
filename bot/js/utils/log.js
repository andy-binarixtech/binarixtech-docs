function logNative(msg) {
    const timestamp = new Date().toISOString();
    document.getElementById("log").textContent += timestamp + " : " + msg + "\n";
}

function log(msg, type="default") {
    const timestamp = new Date().toLocaleString();
    const logContainer = document.getElementById("log");

    const entry = document.createElement("div");
    entry.className = "log-entry";

    const timeCol = document.createElement("div");
    timeCol.className = "log-time";
    timeCol.textContent = timestamp;

    const actionCol = document.createElement("div");
    actionCol.className = "log-action";

    const btnFormat = document.createElement("button");
    btnFormat.textContent = "Toggle JSON";
    btnFormat.onclick = () => toogleFormatJson(btnFormat);

    const btnCopy = document.createElement("button");
    btnCopy.textContent = "Copy";
    btnCopy.onclick = () => copyJsonData(btnCopy);

    const msgCol = document.createElement("div");
    msgCol.className = "log-msg " + type;

    const icon = document.createElement("span");
    icon.className = "log-icon";

    // chọn icon theo loại log
    switch(type) {
    case "sent": icon.textContent = "📤"; break;
    case "received": icon.textContent = "📥"; break;
    case "error": icon.textContent = "⚠️"; break;
    default: icon.textContent = "ℹ️";
    }

    const text = document.createElement("span");
    text.className = 'log-content';
    text.textContent = msg;

    msgCol.appendChild(icon);
    msgCol.appendChild(text);
    actionCol.appendChild(btnFormat);
    actionCol.appendChild(btnCopy);

    entry.appendChild(timeCol);
    entry.appendChild(actionCol);
    entry.appendChild(msgCol);
    logContainer.appendChild(entry);

    logContainer.scrollTop = logContainer.scrollHeight;
}