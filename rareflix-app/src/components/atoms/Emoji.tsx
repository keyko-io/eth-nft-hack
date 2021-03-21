import React from "react";
import styles from "./Emoji.module.scss";

interface EmojiProps {
  emoji: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ emoji, label }) => (
  <span
    className={styles.emoji}
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {emoji}
  </span>
);

export default Emoji;
