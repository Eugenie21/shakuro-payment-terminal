import * as React from 'react';
import { IBaseComponentProps } from 'Common';
import cx from 'bem-classnames';

import  './index.scss';

interface IProps extends IBaseComponentProps {

}

const classes = {
    Logo: { name: 'Logo' }
}

const logo: React.StatelessComponent<IProps> = ({ className }) => {
    return (
        <p className={cx(classes.Logo, {}, className)}>
            Payment Terminal
        </p>
    );
}

export {
    logo as Logo
}