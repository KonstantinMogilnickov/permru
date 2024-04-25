import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div onClick ={props.onClose}
      className={`${Styles["overlay"]} ${props.isOpened && Styles['overlay_is-opened']}`}
    ></div>
  );
};
