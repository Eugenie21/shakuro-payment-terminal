import * as React from 'react';
import cx from 'bem-classnames';
import { Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

import { Title, Loader, OperatorLogo } from 'Components/ui';
import RefillForm from './form';
import { Routes, IOperator, Size } from 'Common';
import { getOperator } from 'Util/api';

import './index.scss';

interface IParams {
    operatorId: string | undefined
}

interface IProps extends RouteChildrenProps<IParams> {

}

interface IState {
    isLoading: boolean,
    operator: IOperator | undefined
}

class Refill extends React.Component<IProps, IState> {

    classes = {
        Refill: { name: 'Refill' },
        Title: { name: 'Refill__Title' },
        Back: { name: 'Refill__Back' },
        OperatorLogo: { name: 'Refill__OperatorLogo' }
    }

    get hasOperatorToRender() {
        return !this.state.isLoading && this.state.operator;
    }

    get operatorId() {
        return this.props.match ? this.props.match.params.operatorId : undefined;
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoading: true,
            operator: undefined
        }
    }

    renderForm() {
        if (!this.hasOperatorToRender) {
            return null;
        }

        return (
            <React.Fragment>
                <OperatorLogo 
                    className={cx(this.classes.OperatorLogo)} 
                    operator={this.state.operator!} 
                />
                <RefillForm 
                    onSuccess={this.handleFormSuccess.bind(this)}
                    operator={this.state.operator!}
                />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={cx(this.classes.Refill)}>
                <Title className={cx(this.classes.Title)}>
                    <Link className={cx(this.classes.Back)} to={Routes.ROOT} replace={true}>←</Link>
                    Enter user data
                </Title>
                {this.state.isLoading && (<Loader size={Size.LARGE} />)}
                {this.renderForm()}
            </div>
        );
    }

    componentDidMount() {
        this.loadOperator();
    }

    // HANDLERS
    handleFormSuccess() {
        this.props.history.replace(Routes.ROOT);
    }

    // HELPERS
    async loadOperator() {
        if (!this.operatorId) {
            return;
        }

        try {
            const res = await getOperator(Number(this.operatorId));
            this.setState({
                isLoading: false,
                operator: res.data
            });
        } catch(err) {
            console.error(err.message);
        }
    }
}

export {
    Refill
}