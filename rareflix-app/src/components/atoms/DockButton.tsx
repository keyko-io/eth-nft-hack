import React from "react";
import styles from "./Dockbutton.module.scss";

interface IProps {
  onClick?: () => void;
}

const DockButton: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <button className={styles.dockButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default DockButton;
