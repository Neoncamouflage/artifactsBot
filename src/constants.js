const config = require('config')
module.exports = {
    //API data
    AUTH_TOKEN:'Bearer '+config.token,
    API_BASE_URL:'https://api.artifactsmmo.com',

    //Game data
    SKILLS: ['mining','woodcutting','fishing','weaponcrafting','gearcrafting','jewelrycrafting','cooking'],
    INVENTORY_MAX_ITEMS: 100,
    INVENTORY_SLOTS: 20,

}

