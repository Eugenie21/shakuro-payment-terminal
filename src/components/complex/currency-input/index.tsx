import * as React from 'react';
import { Omit } from 'utility-types';

import { IInputProps, Input } from 'Components/ui';

interface IProps extends Omit<IInputProps, 'onChange'> {
    min?: number,
    max?: number,
    currencySign: string,
    onChange: (value: string) => void
}

class CurrencyInput extends React.Component<IProps> {

    render() {
        const { min, max, currencySign, onChange, ...props } = this.props; 
        return (
            <Input 
                {...props} 
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)} 
            />
        );
    }

    // HANDLERs
    handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        const { value, currencySign } = this.props;
        const cleanValue = value.replace(` ${currencySign}`, '');
        this.props.onChange(cleanValue);

        this.props.onFocus && this.props.onFocus(e);
    }

    handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { value, currencySign } = this.props;
        if (value.length > 0) {
            this.props.onChange(`${value} ${currencySign}`);
        }

        this.props.onBlur && this.props.onBlur(e);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { min, max } = this.props;
        const reg = /[^0-9]/g;
        const raw = e.target.value.replace(reg, '');

        if (raw.length === 0) {
            this.props.onChange('');
            return;
        }

        const clampedNumber = this.clampValue(Number(raw), min, max);
        const formatted = this.formatValue(clampedNumber);
        this.props.onChange(formatted);
    }

    // HELPERS
    clampValue(value: number, min: number | undefined, max: number | undefined): number {
        return Math.min(max || value, Math.max(min || value, value));
    }

    formatValue(value: number): string {
        const digits = Array.from(value.toString());
        const reversed: string[] = digits.reverse().reduce((prev: string[], digit: string, index: number) => {

            if (index > 0 && index % 3 === 0) {
                return [...prev, ' ', digit]
            }

            return [...prev, digit];
        }, []);

        return reversed.reverse().join('');
    }
}

export {
    CurrencyInput
}