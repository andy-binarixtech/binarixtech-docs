let G_BNR_TOKEN
let G_USER_ID
let G_GROUP_ID;
let G_ROOM_ID;
let G_PLAYER_INFOS = [];
let G_TABLE_CARDS = [];
let G_SELECTED_ROOM;
let G_QUICK = false;

const G_ZONES = {
    'LOBBY': {
        'zoneId': 'LOBBY',
        'pluginId': 'LOBBY',
    },
    'POKER': {
        'zoneId': 'POKER',
        'pluginId': 'POKER',
    },
    'SICBO': {
        'zoneId': 'SICBO',
        'pluginId': 'SICBO',
    },
    'SicboZone': {
        'zoneId': 'SicboZone',
        'pluginId': 'sicboPlugin',
    },
};
let G_ZONE_NAME = '';
let G_PLUGIN_NAME = '';

const G_ZONE_PLUGIN_MSG = [6,G_ZONE_NAME,G_PLUGIN_NAME,{}];

const G_USER_IDS = [
  "ryu", "ken", "chunli", "guile", "sagat", "mbison", "balrog", "vega", 
  "dhalsim", "blanka", "cammy", "akuma", "sakura", "dan", "rose", "cody", 
  "guy", "juri", "abel", "honda", "anna", "nina", "jin", "kazuya", 
  "heihachi", "paul", "hwoarang", "king", "armor_king", "law", "lee", 
  "xiaoyu", "asuka", "lars", "bryan", "jack", "yoshimitsu", "kazumi", 
  "devil_jin", "alisa", "claudio", "feng", "marduk", "steve", "leo", 
  "dragunov", "bob", "eddy", "christie", "panda", "kuma"
];