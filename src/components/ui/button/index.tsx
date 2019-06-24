import * as React from 'react';
import { IBaseComponentProps } from 'Common';
import cx from 'bem-classnames';

import  './index.scss';

interface IProps extends IBaseComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const classes = {
    Button: { 
        name: 'Button',
        states: ['disabled']
    }
}

const button: React.StatelessComponent<IProps> = ({ className, children, ...props }) => {
    return (
        <button 
            {...props}
            disabled={props.disabled}
            className={cx(classes.Button, { disabled: props.disabled }, className)}>
            {children}
        </button>
    );
}

export {
    button as Button,
    IProps as IButtonProps
}