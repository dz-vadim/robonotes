import React, {forwardRef, TextareaHTMLAttributes, useEffect, useRef} from "react";
import classes from "./MyTextarea.module.css";

interface MyTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const MyTextarea = forwardRef<HTMLTextAreaElement, MyTextareaProps>((props, ref) => {
    return (
        <textarea ref={ref} className={classes.myTextarea} {...props} />
    );
});

export default MyTextarea;
