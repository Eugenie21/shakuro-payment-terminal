import * as React from 'react';
import cx from 'bem-classnames';
import { IBaseComponentProps, IOperator } from 'Common';

import { OperatorButton } from 'Components/ui';

import './index.scss';

interface IProps extends IBaseComponentProps {
    list: IOperator[],
    onOperatorSelect?: (operator: IOperator) => void
}

class OperatorsList extends React.Component<IProps, {}> {

    classes = {
        'OperatorsList': { name: 'OperatorsList' },
        'Operator': { name: 'OperatorsList__Operator' }
    }

    renderOperator(operator: IOperator, index: number) {
        return (
            <React.Fragment key={index}>
                <OperatorButton 
                    className={cx(this.classes.Operator)}
                    operator={operator}
                    onClick={this.handleOperatorClick.bind(this, operator)}
                />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={cx(this.classes.OperatorsList, {}, this.props.className)}>
                {this.props.list.map(this.renderOperator.bind(this))}
            </div>
        );
    }

    // HANDLERS
    handleOperatorClick(operator: IOperator) {
        const { onOperatorSelect } = this.props;
        onOperatorSelect && onOperatorSelect(operator);
    }
}

export {
    OperatorsList
}