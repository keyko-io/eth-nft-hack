import React from "react";
import { useDocker } from "../../../context/DockProvider";
import { useSlider } from "../../../context/SliderProvider";
import BigEmoji from "../../atoms/BigEmoji";
import Emoji from "../../atoms/Emoji";
import EyeButton from "../../atoms/EyeButton";
import RoundButton from "../../atoms/RoundButton";
import RoundButtonLeft from "../../atoms/RoundButtonLeft";
import ButtonActionGrid from "../ButtonActionGrid";
import styles from "./SwipeBar.module.scss";

const SwipeBar: React.FC = () => {
  const { prev, next } = useSlider();

  const { toggleActive } = useDocker();

  return (
    <div className={styles.grid}>
      <div className={styles.alignRight}>
        <RoundButton onClick={prev}>
          <Emoji emoji={"👈"} label={"dislike"} />
        </RoundButton>
      </div>
      <div className={styles.alignRight}>
        <RoundButton onClick={prev}>
          <Emoji emoji={"👎"} label={"dislike"} />
        </RoundButton>
      </div>
      <div>
        <EyeButton onClick={toggleActive}>
          <BigEmoji emoji={"👁"} label={"like"} />
        </EyeButton>
      </div>
      <div className={styles.alignLeft}>
        <RoundButtonLeft onClick={next}>
          <Emoji emoji={"👍"} label={"like"} />
        </RoundButtonLeft>
      </div>
      <div className={styles.alignLeft}>
        <RoundButtonLeft onClick={next}>
          <Emoji emoji={"👉"} label={"like"} />
        </RoundButtonLeft>
      </div>
      {/* <div className={styles.madeByWrapper}>
        <div className={styles.madeBy}>
          Made with love by 🤖 || 👩‍🎨
        </div>
      </div> */}
    </div>
  );
};

export default SwipeBar;
