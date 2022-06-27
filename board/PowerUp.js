import React from 'react';
import { getMapData, getBoardData } from './config';

import Damage from './Powerup/Damage';

const calculatePowerUpStyles = (x, y) => {
    const boardData = getBoardData();
    return {
        top: y + 'em',
        left: x + 'em',
        width: '1em',
        height: '1em',
        position: 'absolute',
    }
};

const getPowerUp = () => {
    return Damage;
};

const PowerUps = () => {
    const { powerUps } = getMapData();
    return powerUps.map(powerUp => <PowerUp key={'pwu_'+ powerUp.id} {...powerUp} />);
};

const PowerUp = React.memo(props => {
    const { x, y, type, damage, id } = props;
    const SvgImage = getPowerUp();

    return (
        <div className="powerUps" key={'pwu_'+ id.toString} style={calculatePowerUpStyles(x, y)}>
            <SvgImage/>
        </div>
    );
});

export default PowerUps;
