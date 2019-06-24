import * as React from 'react';
import { IBaseComponentProps, IOperator } from 'Common';
import cx from 'bem-classnames';

import  './index.scss';
import { OperatorLogo } from 'Components/ui';

interface IProps extends IBaseComponentProps {
    operator: IOperator,
    onClick?: () => void
}

const classes = {
    OperatorButton: { name: 'OperatorButton' },
    Logo: { name: 'OperatorButton__Logo' },
    Label: { name: 'OperatorButton__Label' }
}

const operatorButton: React.StatelessComponent<IProps> = ({ className, operator, onClick }) => {
    return (
        <button 
            className={cx(classes.OperatorButton, {}, className)}
            type={'button'}
            onClick={onClick}>
            <OperatorLogo className={cx(classes.Logo)} operator={operator} />
            <span className={cx(classes.Label)}>{operator.name}</span>
        </button>
    );
}

export {
    operatorButton as OperatorButton
}