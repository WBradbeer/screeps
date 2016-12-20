var spawner = require('spawner');
var countRole = {
    creepParts: {
        'harvester': [WORK, WORK, WORK, CARRY,  MOVE],
        'transporter': [CARRY, CARRY, MOVE, MOVE],
        'builder': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        'upgrader': [WORK, WORK, WORK, CARRY, MOVE],
        'repairer': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        'defender': [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE]
    },
    maxCreeps: 12,

    run: function(spawn, data) {
        var maxEnergy = Game.spawns[spawn].room.energyCapacityAvailable
        var all = _.filter(Game.creeps, (creep) => true);
        if (all.length == 0) {
                var newName = spawner['harvester'](maxEnergy, spawn, simple=true)
            }

        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            console.log(role + 's: ' + inRole.length);
            if(inRole.length / Math.max(1, all.length)  < data[role] && all.length < this.maxCreeps) {
                var newName = spawner[role](maxEnergy, spawn)
                console.log('Spawning new ' + role + ': ' + newName);
            }
            else if(role == 'transporter' && inRole.length == 0 && all.length) {
                creep = _.filter(Game.creeps, (creep) => creep.memory.role != role)[0];
                creep.memory.role = role
                console.log('Converting ' + creep.name + ' to ' + role)
            } 

        }
    }
};
module.exports = countRole;
