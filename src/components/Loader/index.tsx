import styles from "./loader.module.css";
export default function Loading() {
  return (
    <div className={styles.containerLoading}>
      <div className={styles.loader}></div>
    </div>
  );
}
