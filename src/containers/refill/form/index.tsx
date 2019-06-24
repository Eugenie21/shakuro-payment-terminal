import * as React from 'react';
import cx from 'bem-classnames';

import { MaskedInput, CurrencyInput, FormButton } from 'Components/complex';
import { IBaseComponentProps, IOperator, Intent } from 'Common';
import { IRefillInputData, refill } from 'Util/api';

import './index.scss';
import { Message } from 'Components/ui';

interface IProps extends IBaseComponentProps {
    operator: IOperator,
    onSuccess?: () => void
}

interface IState {
    isBusy: boolean,
    messageState: {
       intent: Intent,
       message: string 
    } | null,
    formData: IRefillInputData,
    fieldErrors: {
        phone: string,
        amount: string
    }
}

class RefillForm extends React.Component<IProps, IState> {

    phoneDigitsNumber = 11;
    redirectTimeout: NodeJS.Timeout | null = null;
    classes = {
        RefillForm: { name: 'RefillForm' },
        Input: { name: 'RefillForm__Input' },
        Message: { name: 'RefillForm__Message' },
        Button: { name: 'RefillForm__Button' }
    }

    get phoneMask(): string {
        const { operator } = this.props;
        return `+${operator.countryCode}(999) 999-99-99`;
    }

    get disableSubmit(): boolean {
        const { formData, fieldErrors } = this.state;
        const hasEmptyFields = formData.amount.length === 0 || formData.phoneNumber.length === 0;
        const hasInvalidFields = fieldErrors.amount.length > 0 || fieldErrors.phone.length > 0;
        return hasEmptyFields || hasInvalidFields;
    }
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            isBusy: false,
            messageState: null,
            formData: {
                operatorId: props.operator.id,
                phoneNumber: '',
                amount: ''
            },
            fieldErrors: {
                phone: '',
                amount: ''
            }
        }
    }

    renderMessage() {
        const { messageState } = this.state;

        return messageState ? (
            <Message 
                className={cx(this.classes.Message)} 
                intent={messageState.intent}>
                {messageState.message}
            </Message>
        ) : null;
    }

    render() {
        return (
            <form 
                className={cx(this.classes.RefillForm)} 
                onSubmit={this.handleFormSubmit.bind(this)}>

                <MaskedInput 
                    className={cx(this.classes.Input)}
                    mask={this.phoneMask}
                    value={this.state.formData.phoneNumber} 
                    label={'Phone number'}
                    placeholder={'Enter your phone number'}
                    errorMessage={this.state.fieldErrors.phone}
                    onBlur={this.handlePhoneBlur.bind(this)}
                    onChange={this.handlePhoneChange.bind(this)}
                />
                <CurrencyInput 
                    className={cx(this.classes.Input)}
                    min={1}
                    max={1000}
                    value={this.state.formData.amount}
                    currencySign={'₽'}
                    label={'Amount in roubles'} 
                    placeholder={'Enter refill amount'}
                    errorMessage={this.state.fieldErrors.amount}
                    onBlur={this.handleAmountBlur.bind(this)}
                    onChange={this.handleAmountChange.bind(this)}
                />
                {this.renderMessage()}
                <FormButton
                    className={cx(this.classes.Button)}
                    type={'submit'}
                    disabled={this.disableSubmit}
                    busy={this.state.isBusy}>
                    SUBMIT
                </FormButton>
            </form>
        );
    }

    // HANDLERS
    async handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState({
            isBusy: true,
            messageState: null
        });

        try {
            const res = await refill(this.state.formData);

            this.setState({
                isBusy: res.success,
                messageState: {
                    intent: res.success ? Intent.SUCCESS : Intent.ERROR,
                    message: res.success ? 'SUCCESS !!!' : 'Error while sending your form data'
                }
            });

            if (res.success && this.props.onSuccess) {
                this.redirectTimeout = setTimeout(this.props.onSuccess, 1000);
            }

        } catch(error) {
            this.setState({
                isBusy: false,
                messageState: {
                    intent: Intent.ERROR,
                    message: error.message
                }
            });
        }
    }

    handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState((state) => ({
            formData: {
                ...state.formData,
                phoneNumber: e.target.value
            },
            fieldErrors: {
                ...state.fieldErrors,
                phone: ''
            }
        }))
    }

    handlePhoneBlur() {
        const isValid = this.checkPhoneValidity();
        if (!isValid) {
            this.setState(state => ({
                fieldErrors: {
                    ...state.fieldErrors,
                    phone: 'Phone number is invalid'
                }
            }));
        }
    }

    handleAmountChange(value: string) {
        this.setState(state => ({
            formData: {
                ...state.formData,
                amount: value
            },
            fieldErrors: {
                ...state.fieldErrors,
                amount: ''
            }
        }));
    }

    handleAmountBlur() {
        if (this.state.formData.amount.length === 0) {
            this.setState(state => ({
                fieldErrors: {
                    ...state.fieldErrors,
                    amount: 'Amount value cannot be empty'
                }
            }));
        }
    }

    // HELPERS
    checkPhoneValidity(): boolean {
        const reg = /[\+\(\)\s\-\_]/g;
        const rawNumber = this.state.formData.phoneNumber.replace(reg, '');
        return rawNumber.length === this.phoneDigitsNumber;
    }
}

export default RefillForm;