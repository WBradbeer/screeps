var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var flags = Game.flags
        if(closestHostile) {
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile);
            }
        } else if (flags.length) {
            creep.goTo(flags[0])
        }
    }
};

module.exports = roleDefender;
