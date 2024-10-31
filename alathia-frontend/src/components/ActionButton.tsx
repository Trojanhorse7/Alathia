import styles from '../styles';

const ActionButton = ({ imgUrl, handleClick, restStyles, ...rest}: any) => (
  <div
    className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles} `}
    onClick={handleClick}
    {...rest}
  >
    <img src={imgUrl} alt="action_img" className={styles.gameMoveIcon} />
  </div>
);

export default ActionButton;
