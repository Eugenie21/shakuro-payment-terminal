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
    return (
        <img 
            className={cx(classes.OperatorLogo, {}, className)}
            src={`/public/media/cell-operators/${operator.type}.png`} 
            alt={operator.name} 
        />
    );
}

export {
    operatorLogo as OperatorLogo
}