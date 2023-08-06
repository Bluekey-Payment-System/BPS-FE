import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className={styles.progressBar}>
      <p>{`${value}%`}</p>
      <div className={styles.barWrapper}>
        <div className={styles.bar} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
