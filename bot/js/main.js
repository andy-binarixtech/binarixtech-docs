function generateRequestId() {
    return crypto.randomUUID();
}
    
function getZones(zoneName) {
    if (zoneName) {
        return G_ZONES[zoneName];
    }
    return G_ZONES;
}

const getUserNameElement = () => document.getElementById('userName');
const getPasswordElement = () => document.getElementById('password');

const getUserName = () => getUserNameElement().value;
const getPassword = () => getPasswordElement().value;

const setUserName = (userName) => {
    getUserNameElement().value = userName;
}
const setPassword = (password) => {
    getPasswordElement().value = password;
}

window.addEventListener('load', (event) => {
    setUserName(getRandomUserId());
});