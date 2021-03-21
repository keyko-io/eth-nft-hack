import React from "react";
import styles from "./BigEmoji.module.scss";

interface EmojiProps {
  emoji: string;
  label?: string;
}

const BigEmoji: React.FC<EmojiProps> = ({ emoji, label }) => (
  <span
    className={styles.emoji}
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {emoji}
  </span>
);

export default BigEmoji;
