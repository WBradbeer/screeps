var spawn = {
    harvester: function(max_energy, simple=false){
        if (simple) {
            parts = [WORK, CARRY, MOVE];
            memory = {'role': 'harvester', 'simple': true}
        } else{
            works = Math.floor(Math.max((max_energy - BODYPART_COST[CARRY] - BODYPART_COST[MOVE])/BODYPART_COST[WORK], 5));
            parts = Array(works).fill(WORK).concat([CARRY, MOVE]);
            memory = {'role': 'harvester', 'simple': false};
        }
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    },
    transporter: function(max_energy){
        number = Math.floor((max_energy - BODYPART_COST[MOVE])/BODYPART_COST[CARRY]);
        parts = Array(number).fill(CARRY).concat([MOVE]);
        memory = {'role': 'transporter'};
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    },
    upgrader: function(max_energy){
        num_work = Math.floor((max_energy - 2* BODYPART_COST[MOVE])/(BODYPART_COST[WORK] + BODYPART_COST[CARRY]));
        num_carry = Math.floor((max_energy - 2* BODYPART_COST[MOVE] - num_work*BODYPART_COST[CARRY])/(BODYPART_COST[CARRY]));
        parts = Array(num_work).fill(WORK).concat(Array(num_carry).fill(CARRY)).concat([MOVE, MOVE]);
        memory = {'role': 'upgrader'};
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    },
    builder: function(max_energy){
        num_work = Math.floor((max_energy - 2* BODYPART_COST[MOVE])/(BODYPART_COST[WORK] + BODYPART_COST[CARRY]));
        num_carry = Math.floor((max_energy - 2* BODYPART_COST[MOVE] - num_work*BODYPART_COST[CARRY])/(BODYPART_COST[CARRY]));
        parts = Array(num_work).fill(WORK).concat(Array(num_carry).fill(CARRY)).concat([MOVE, MOVE]);
        memory = {'role': 'upgrader'};
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    },
    repairer : function(max_energy){
        num_work = Math.floor((max_energy - 2* BODYPART_COST[MOVE])/(BODYPART_COST[WORK] + BODYPART_COST[CARRY]));
        num_carry = Math.floor((max_energy - 2* BODYPART_COST[MOVE] - num_work*BODYPART_COST[CARRY])/(BODYPART_COST[CARRY]));
        parts = Array(num_work).fill(WORK).concat(Array(num_carry).fill(CARRY)).concat([MOVE, MOVE]);
        memory = {'role': 'repairer'};
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    },
    defender : function(max_energy){
        num_move = Math.floor((max_energy)/(BODYPART_COST[RANGED_ATTACK] + BODYPART_COST[MOVE]));
        num_ranged = Math.floor((max_energy- num_move*BODYPART_COST[MOVE])/(BODYPART_COST[RANGED_ATTACK]));
        parts = Array(num_work).fill(RANGED_ATTACK).concat(Array(num_move).fill(MOVE));
        memory = {'role': 'defender'};
        Game.spawns['Spawn1'].createCreep(parts, undefined, memory);
    }
};
module.exports = spawn;