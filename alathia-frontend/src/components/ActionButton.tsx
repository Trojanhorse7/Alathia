import styles from '../styles';
import ClipLoader from 'react-spinners/ClipLoader';

const ActionButton = ({ imgUrl, handleClick, restStyles, disabled, ...rest}: any) => (
  <button 
    type='button'
    disabled={disabled}
    className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles} `}
    onClick={handleClick}
    {...rest}
  >
    {
      disabled ? (
        <ClipLoader
          className="loader-icon"
          color={"rgb(255, 255, 255)"}
          loading={disabled}
          size={13}
          speedMultiplier={1}
        />
      ) : (
        <img src={imgUrl} alt="action_img" className={styles.gameMoveIcon} />
      )
    }
  </button>
);

export default ActionButton;
