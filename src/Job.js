const gameAPI = require('./gameAPI');
const {AUTH_TOKEN,SKILLS,INVENTORY_SLOTS,INVENTORY_MAX_ITEMS}  = require('./constants');

//Job prototype to handle objectives and subtasks
function Job(data) {
    this.skills = {};
    this.task = {};
    this.gear = {};
    this.objective = null;
    this.jobs = [];
    this.personality = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    this.setData(data);
}