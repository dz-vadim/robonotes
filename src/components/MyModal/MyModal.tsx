import React from "react";
import classes from "./MyModal.module.css";

interface MyModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const MyModal: React.FC<MyModalProps> = ({ children, visible, setVisible }) => {
    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
