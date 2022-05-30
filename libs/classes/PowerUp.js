const Helper = new require('./Helper.js');
class PowerUp {

    constructor(config, Obstacles) {
        Helper.output(Obstacles);
        Helper.output(`constructor`);
        Helper.output(config);
        this.config = config;
        this.obstacles = Obstacles;
        Helper.output(this.obstacles);
        this.powerUps = [];
        this.generate();
    }

    get map() {
        Helper.output(`get power rune map`);
        return this.powerUps;
    }

    generate(isPositionAvailable) {
        let b = null;
        b = this.randomInt(0, 1);
        Helper.output(b);
        if (b == 0) {
            Helper.output(`Generate Power Rune`);

            let x = null;
            let y = null;

            while (
                x === null ||
                this.checkPowerUpPosition({x, y}) === true
            ) {
                x = this.randomInt(0, this.config.MAP_SIZE_X - 1);
                y = this.randomInt(0, this.config.MAP_SIZE_Y - 1);
            }

            if (isPositionAvailable) {
                this.powerUps.push({
                    id : this.powerUps.length + 1,
                    x,
                    y,
                    type: 'damage'
                });
            }

            Helper.output(this.powerUps);

            return this.powerUps;
        }
    }

    checkPowerUpPosition(position) {
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

}

module.exports = (config) => { return new PowerUp(config) }