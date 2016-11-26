var countRole = {
    run: function(data) {
        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            console.log(role + 's: ' + inRole.length);
            
            if(inRole.length < data[role]) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE], undefined, {'role': role});
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
