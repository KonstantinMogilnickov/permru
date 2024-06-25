import Styles from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={Styles["loader"]}>
          <span className={Styles["loader__element"]}></span>
          <span className={Styles["loader__element"]}></span>
          <span className={Styles["loader__element"]}></span>
        </div>
    );
};
  