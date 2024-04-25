import styles from "./Card.module.css"; 


export const Card = (props)=>{
    return(
            <article className={styles["card"]}>
                <img
                  src={props.image_path}
                  alt="newsImage"
                  className={styles["card__image"]}
                />
                <div className={styles["card__content-block"]}>
                  <h3 className={styles["card__title"]}>{props.title}</h3>
                  <p className={styles["card__description"]}>
                   {props.text}
                  </p>
                  <div className={styles["card__info-container"]}>
                    <p className={styles["card__author"]}>
                      Автор: <span className={styles["card__Author"]}>{props.creator}</span>
                    </p>
                  </div>
                </div>
            </article>
    );
}