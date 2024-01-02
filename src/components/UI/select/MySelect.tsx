import React, {ButtonHTMLAttributes, FC, SelectHTMLAttributes} from 'react';
import classes from "./MySelect.module.css";
interface MySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
}
const MySelect: FC<MySelectProps> = ({ children, ...props }) => {
    return (
            <select {...props} className={classes.mySelect}>
                {children}
            </select>
    );
};

export default MySelect;