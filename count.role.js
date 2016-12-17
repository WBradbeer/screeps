var countRole = {
    creepParts: {
        'harvester': [WORK, WORK, WORK, CARRY,  MOVE],
        'builder': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        'upgrader': [WORK, WORK, WORK, CARRY, MOVE],
        'repairer': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        'defender': [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE]
    },
    maxCreeps: 12,

    run: function(data) {
        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            var all = _.filter(Game.creeps, (creep) => true);
            console.log(role + 's: ' + inRole.length);
            
            if(inRole.length / all.length  < data[role] && all.length < this.maxCreeps) {
                var newName = Game.spawns['Spawn1'].createCreep(this.creepParts[role], undefined, {'role': role});
                console.log('Spawning new ' + role + ': ' + newName);
            }
            else if(role == 'harvester' && inRole.length == 0 && all.length) {
                creep = _.filter(Game.creeps, (creep) => creep.memory.role != role)[0];
                creep.memory.role = role
                console.log('Converting ' + creep.name + ' to harvester.')
            }

        }
    }
};
module.exports = countRole;
