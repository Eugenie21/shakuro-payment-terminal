import * as React from 'react';
import { IBaseComponentProps, IOperator } from 'Common';
import cx from 'bem-classnames';

interface IProps extends IBaseComponentProps {
    operator: IOperator
}

const classes = {
    OperatorLogo: { name: 'OperatorLogo' }
}

const operatorLogo: React.StatelessComponent<IProps> = ({ className, operator }) => {
    const image = require(`Media/cell-operators/${operator.type}.png`);
    return (
        <img 
            className={cx(classes.OperatorLogo, {}, className)}
            src={image}
            alt={operator.name} 
        />
    );
}

export {
    operatorLogo as OperatorLogo
}