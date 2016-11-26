var countRole = {
    creepParts: {
        'harvester': [WORK, WORK, WORK, CARRY, MOVE],
        'builder': [WORK, WORK, WORK, CARRY, MOVE],
        'upgrader': [WORK, WORK, WORK, CARRY, CARRY, MOVE],
        'repairer': [WORK, WORK, WORK, CARRY, MOVE],
        'defender': [Attack, Attack, MOVE]
    },

    run: function(data) {
        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            console.log(role + 's: ' + inRole.length);
            
            if(inRole.length < data[role]) {
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
