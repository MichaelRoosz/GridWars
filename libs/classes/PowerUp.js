const Helper = new require('./Helper.js');
class PowerUp {

    constructor(config, obstacles) {
        this.config = config;
        this.powerUps = [];
        this.obstacles = obstacles;
        this.generate();
    }

    get map() {
        return this.powerUps;
    }

    generate(isPositionAvailable) {
        let b = null;
        b = this.randomInt(0, 49);
        if (b == 0) {
            Helper.output(`Generate Power Rune`);

            let x = null;
            let y = null;

            while (
                x === null || this.checkPowerUpPosition({x, y,}) === true
            ) {
                x = this.randomInt(0, this.config.MAP_SIZE_X - 1);
                y = this.randomInt(0, this.config.MAP_SIZE_Y - 1);
            }

            if (isPositionAvailable && !this.checkObstaclesPosition({x, y})) {
                this.powerUps.push({
                    id : this.powerUps.length + 1,
                    x,
                    y,
                    type: 'damage'
                });
            }

            return this.powerUps;
        }
    }

    checkPowerUpPosition(position) {
        const size = this.powerUps.length;

        if (!size) {
            return false;
        }

        for (let i = 0; i < size; i++) {
            if (this.powerUps[i].x === position.x && this.powerUps[i].y === position.y) {
                return true;
            }
        }
        
        return false;
    }

    checkObstaclesPosition(position) {
        const size = this.obstacles.length;

        if (!size) {
            return false;
        }

        for (let i = 0; i < size; i++) {
            if (this.obstacles[i].x === position.x && this.obstacles[i].y === position.y) {
                return true;
            }
        }

        return false;
    }

    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low)
    }

    removePowerUp(movePosition) {
        let
        id = null;
    
        this.powerUps.forEach(function(powerUp) {
            if (powerUp.x === movePosition.x && powerUp.y === movePosition.y) {
                id = powerUp.id;
            }
        });

        var index = this.powerUps.map(x => {
            return x.id;
        }).indexOf(id);

        this.powerUps.splice(index, 1);
    }

}

module.exports = (config, powerUp) => { return new PowerUp(config, powerUp) }