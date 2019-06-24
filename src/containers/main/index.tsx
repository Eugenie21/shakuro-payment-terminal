import * as React from 'react';
import cx from 'bem-classnames';
import { RouteChildrenProps } from 'react-router';

import { Title, Loader } from 'Components/ui';
import { OperatorsList } from 'Components/complex';
import { IOperator, Routes, Size } from 'Common';
import { getOperators } from 'Util/api';

import './index.scss';

interface IProps extends RouteChildrenProps<{}> {

}

interface IState {
    isLoading: boolean,
    operators: IOperator[]
}

class Main extends React.Component<IProps, IState> {

    classes = {
        Main: { name: 'Main' },
        Title: { name: 'Main__Title' },
        OperatorsList: { name: 'Main__OperatorsList' }
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoading: true,
            operators: []
        }
    }

    render() {
        return (
            <div className={cx(this.classes.Main)}>
                <Title className={cx(this.classes.Title)}>
                    Choose your operator
                </Title>
                {this.state.isLoading ? (
                    <Loader size={Size.LARGE} />
                ) : (
                    <OperatorsList 
                        className={cx(this.classes.OperatorsList)}
                        list={this.state.operators}
                        onOperatorSelect={this.handleOperatorSelect.bind(this)}
                    />
                )}
            </div>
        );
    }

    componentDidMount() {
        this.updateOperators();
    }

    // HANDLERS
    handleOperatorSelect(operator: IOperator) {
        this.props.history.push(`${Routes.REFILL}/${operator.id}`)
    }

    // HELPERS
    async updateOperators() {
        try {
            const res = await getOperators();
            this.setState({
                isLoading: false,
                operators: res.data ? res.data : []
            });
        } catch(err) {
            console.error(err.message);
        }
    }
}

export {
    Main
}