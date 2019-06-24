import * as React from 'react';
import cx from 'bem-classnames';

import { IBaseComponentProps, Intent } from 'Common';

import  './index.scss';

interface IProps extends IBaseComponentProps {
    intent: Intent
}

const classes = {
    Message: { 
        name: 'Message',
        modifiers: [ 'intent' ]
    }
}

const message: React.StatelessComponent<IProps> = ({ className, children, intent }) => {
    return (
        <p className={cx(classes.Message, { intent }, className)}>
            {children}
        </p>
    );
}

export {
    message as Message
}