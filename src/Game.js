const gameAPI = require('./gameAPI');
const { AUTH_TOKEN } = require('./constants');
const validTypes = new Set(['characters', 'resources', 'monsters', 'items', 'maps']);


//Game object for interacting with the overall game
const Game = {
    getAll: async function (type,opts) {
        if (!validTypes.has(type)) {
            console.log(`Invalid type: ${type}!`);
            return {};
        }
        const params = opts || null;
        const endpoint = `/${type}`;
        return gameAPI.callAPI(endpoint, 'GET', null, params);
    },
    getMyCharacters: async function (opts) {
        const params = opts || null;
        const endpoint = `/my/characters`;
        return gameAPI.callAPI(endpoint, 'GET', null, params);
    },
};

module.exports = Game;