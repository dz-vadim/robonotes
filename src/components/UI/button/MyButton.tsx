import React, { FC, ButtonHTMLAttributes } from 'react';
import classes from './MyButton.module.css';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const MyButton: FC<MyButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;