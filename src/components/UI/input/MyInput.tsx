import React, { forwardRef, InputHTMLAttributes } from "react";
import classes from "./MyInput.module.css";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...props} />
    );
});

export default MyInput;
