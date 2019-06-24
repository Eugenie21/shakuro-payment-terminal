import * as React from 'react';
import * as cx from 'bem-classnames';
import { IBaseComponentProps } from 'Common';

import { Logo } from 'Components/ui';

import './index.scss';

interface IProps extends IBaseComponentProps {

}

class Header extends React.Component<IProps, {}> {

    classes = {
        'Header': { name: 'Header' },
        'Wrap': { name: 'Header__Wrap' },
        'Logo': { name: 'Header__Logo' }
    }

    render() {
        return (
            <div className={cx(this.classes.Header, {}, this.props.className)}>
                <div className={cx(this.classes.Wrap)}>
                    <Logo className={cx(this.classes.Logo)} />
                </div>
            </div>
        );
    }
}

export {
    Header
}