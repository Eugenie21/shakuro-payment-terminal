import * as React from 'react';
import { IBaseComponentProps } from 'Common';
import cx from 'bem-classnames';

import  './index.scss';

interface IProps extends IBaseComponentProps, React.InputHTMLAttributes<HTMLInputElement> {
    value: string,
    label: string,
    inputRef?: React.RefObject<HTMLInputElement>,
    errorMessage?: string
}

const classes = {
    Input: { 
        name: 'Input',
        states: [ 'inValid', 'disabled' ]
    },
    InputElement: { name: 'Input__InputElement' },
    Label: { name: 'Input__Label' },
    Error: { name: 'Input__Error' }
}

const input: React.StatelessComponent<IProps> = ({className, label, errorMessage, onChange, inputRef,  ...props}) => {
    const containerClassName = cx(
        classes.Input,
        {
            inValid: Boolean(errorMessage),
            disabled: props.disabled
        },
        className
    )
    return (
        <p className={containerClassName}>
            {label && (
                <label className={cx(classes.Label)}>{label}</label>
            )}
            <input
                {...props}
                ref={inputRef}
                className={cx(classes.InputElement)}
                type={'text'}
                onChange={onChange}
                readOnly={!onChange}
            />
            {errorMessage && (
                <span className={cx(classes.Error)}>{errorMessage}</span>
            )}
        </p>
    );
}

export {
    input as Input,
    IProps as IInputProps
}