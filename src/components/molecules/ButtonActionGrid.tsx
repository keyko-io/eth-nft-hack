import React from "react";
import Button from "../atoms/Button";
import styles from "./ButtonActionGrid.module.scss";

const ButtonActionGrid: React.FC = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default ButtonActionGrid;
