import React from "react";
import styles from "./Loading.module.css";
import CachedIcon from "@mui/icons-material/Cached";

function Loading() {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.spinner}>
        <CachedIcon fontSize="inherit" />
      </div>
    </div>
  );
}

export default Loading;
