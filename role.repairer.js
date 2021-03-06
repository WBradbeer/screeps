var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        function findWalls(creep) {
            var returnedWalls = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                   return structure.structureType === (STRUCTURE_WALL || STRUCTURE_RAMPART) &&
                   structure.hits < 50000;
               }
            });
            return returnedWalls;   
        }
        function findDamaged(creep) {
            var damaged = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                   return structure.hits < 0.8*structure.hitsMax &&
                   structure.structureType != STRUCTURE_WALL;
               }
            });
            return damaged;   
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
            var walls = findWalls(creep);
            var damaged = findDamaged(creep);
            if(damaged.length) {
                if(creep.repair(damaged[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damaged[0]);
                }
            } else if(walls.length) {
                if(creep.build(walls[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(walls[0]);
                }
            } else if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var stores = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store.energy > 0);
                    }
            });
            if(stores.length){
                if(creep.withdraw(stores[0], "energy") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(stores[0]);
                }
                
            } else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleRepairer;