var countRole = {
    creepParts: {
        'harvester': [WORK, WORK, CARRY, MOVE, MOVE],
        'builder': [WORK, WORK, WORK, CARRY, MOVE],
        'upgrader': [WORK, WORK, CARRY, CARRY, CARRY, MOVE],
        'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        'defender': [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
    },

    run: function(data) {
        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            var all = _.filter(Game.creeps, (creep) => true);
            console.log(role + 's: ' + inRole.length);
            
            if(inRole.length / all.length - 0.1 < data[role]) {
                var newName = Game.spawns['Spawn1'].createCreep(this.creepParts[role], undefined, {'role': role});
                console.log('Spawning new ' + role + ': ' + newName);
            }
            if(role == 'harvester' && inRole.length == 0) {
                creep = _.filter(Game.creeps, (creep) => creep.memory.role != role)[0];
                creep.memory.role = role
                console.log('Converting ' + creep.name + ' to harvester.')
            }

        }
    }
};
module.exports = countRole;
