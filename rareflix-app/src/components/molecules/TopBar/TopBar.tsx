import React from "react";
import Button from "../../atoms/Button";
import Emoji from "../../atoms/Emoji";
import FadedRoundButton from "../../atoms/FadedRoundButton";
import RoundButton from "../../atoms/RoundButton";
import styles from "./TopBar.module.scss";

const TopBar: React.FC = () => {
  return (
    <div className={styles.topGrid}>
      <div className={styles.alignLeft}>
        <FadedRoundButton>
          <Emoji emoji={"📢"} label={"dislike"} />
        </FadedRoundButton>
      </div>
      <div className={styles.alignRight}>{/* <Button name={'CREATE'}/> */}</div>
      <div className={styles.alignLeft}>{/* <Button name={'COLLECT'}/> */}</div>
      <div className={styles.alignRight}>
        <FadedRoundButton>
          <Emoji emoji={"⏯"} label={"like"} />
        </FadedRoundButton>
        <FadedRoundButton>
          <Emoji emoji={"👨🏻"} label={"like"} />
        </FadedRoundButton>
      </div>
    </div>
  );
};

export default TopBar;
