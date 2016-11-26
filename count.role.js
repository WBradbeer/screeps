var countRole = {
    run: function(data) {
        for(var role in data) {
            var inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
            console.log(role + 's: ' + inRole.length);
            
            if(inRole.length < data[role]) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'role': role});
                console.log('Spawning new ' + role + ': ' + newName);
            }
        }
    }
};
module.exports = countRole;
