import * as React from 'react';
import InputMask from 'react-input-mask';

import { IInputProps, Input } from 'Components/ui';

interface IProps extends IInputProps {
    mask: string
}

class MaskedInput extends React.Component<IProps, {}> {

    render() {
        const { mask, onChange, onBlur, ...props } = this.props; 
        return (
            <InputMask 
                mask={mask} 
                value={props.value} 
                onChange={this.handleChange.bind(this)}
                onBlur={onBlur}>
                {(inputProps: IInputProps) => <Input {...inputProps} {...props} />}
            </InputMask>
        );
    }

    // HANDLERs
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.props.onChange && this.props.onChange(e);
    }
}

export {
    MaskedInput
}