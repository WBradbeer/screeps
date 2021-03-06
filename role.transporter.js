var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var energy = creep.pos.findInRange(
            FIND_DROPPED_ENERGY,
            100
        );
        var stores = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && 
                            structure.store.energy > 0);
                }
        });
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say('harvesting');
        }
        else if(!creep.memory.transporting && (creep.carry.energy == creep.carryCapacity) ||
                (!stores && !energy)) {
            creep.memory.transporting = true;
            creep.say('transporting');
        } 
        if(!creep.memory.transporting) {
            var sources = creep.room.find(FIND_SOURCES);
            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy[0])
                }
            } else if(stores.length){
                if(creep.withdraw(stores[0], "energy") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(stores[0]);
                } 
            } else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE
                                ) && structure.energy < structure.energyCapacity);
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } 
        }
    }
};

module.exports = roleTransporter;
