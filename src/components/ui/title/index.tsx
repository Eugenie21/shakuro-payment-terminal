import * as React from 'react';
import { IBaseComponentProps } from 'Common';
import cx from 'bem-classnames';

import  './index.scss';

interface IProps extends IBaseComponentProps {

}

const classes = {
    Title: { name: 'Title' }
}

const title: React.StatelessComponent<IProps> = ({ className, children }) => {
    return (
        <p className={cx(classes.Title, {}, className)}>
            {children}
        </p>
    );
}

export {
    title as Title
}