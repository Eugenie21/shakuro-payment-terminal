import * as React from 'react';
import cx from 'bem-classnames';

import { IBaseComponentProps, Size } from 'Common';

import  './index.scss';

interface IProps extends IBaseComponentProps {
    size: Size
}

const classes = {
    Loader: { 
        name: 'Loader',
        modifiers: ['size']
    }
}

const loader: React.StatelessComponent<IProps> = ({ className, size }) => {
    return (
        <span className={cx(classes.Loader, { size }, className)} />
    );
}

export {
    loader as Loader
}