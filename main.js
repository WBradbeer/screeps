var roleHarvester = require('role.harvester');
var roleTransporter = require('role.transporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')
var roleDefender = require('role.defender')
var structTower = require('struct.tower');
var countRole = require('count.role');
var structTower = require('struct.tower');


module.exports.loop = function () {

        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    roles = {
        'harvester': 0.2,
        'builder': 0.2,
        'upgrader': 0.4,
        'repairer': 0.0,
        'defender': 0.0,
        'transporter': 0.2
    };
    countRole.run('Spawn1', roles)
    
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
        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep)
        }
    }
    var tower = Game.getObjectById('58568f583538b7e5474fbb03');
    structTower.run(tower)
    
}

