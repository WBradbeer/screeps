var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')
var roleDefender = require('role.defender')
var structTower = require('struct.tower');
var countRole = require('count.role');


module.exports.loop = function () {

        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    roles = {
        'harvester': 0.6,
        'builder': 0.1,
        'upgrader': 0.2,
        'repairer': 0.1,
        'defender': 0.0
    }
    countRole.run(roles)
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep)
        }
    }
}

