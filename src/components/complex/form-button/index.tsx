import * as React from 'react';

import { IButtonProps, Button, Loader } from 'Components/ui';
import { Size } from 'Common';

interface IProps extends IButtonProps {
    busy?: boolean
}

const formButton: React.StatelessComponent<IProps> = ({ busy, children, ...props }) => {
    return (
        <Button {...props} disabled={props.disabled || busy}>
            {busy ? (
                <Loader size={Size.SMALL} />
            ) : children}
        </Button>
    );
}

export {
    formButton as FormButton
}