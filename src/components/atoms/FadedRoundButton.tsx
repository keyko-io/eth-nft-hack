import React from "react";
import styles from "./FadedRoundButton.module.scss";

interface IProps {
  onClick?: () => void;
}

const FadedRoundButton: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default FadedRoundButton;
