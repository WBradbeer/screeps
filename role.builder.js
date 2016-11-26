var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        function findWalls(creep) {
            var returnedWalls = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                   return structure.structureType === STRUCTURE_WALL || STRUCTURE_RAMPART;
               }
            });
            return returnedWalls;
        }
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            var walls = findWalls(creep)
            if(walls.length) {
                if(creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(walls[0]);
                }
            }

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;