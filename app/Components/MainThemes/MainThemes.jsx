import Link from "next/link";
import styles from "./MainThemes.module.css";


export const MainThemes = () => {   
    return(
        <div className={styles["main__themes"]}>
          <h3 className={styles['main__themes__title']}>Главные темы</h3>
          <ul className={styles["main__themes__links"]}>
            <li>
              <Link className={styles["main__themes__item"]} href="#">
                    Развитие транспорта 
              </Link>
            </li>
            <li>
              <Link className={styles["main__themes__item"]} href="#">
                    Строительство и благоустройство
              </Link>
            </li>
            <li>
              <Link className={styles["main__themes__item"]} href="#">
                    Развитие IT-отрасли 
              </Link>
            </li>
          </ul>
        </div>
    )
}