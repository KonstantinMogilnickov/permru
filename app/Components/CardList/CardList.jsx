import Link from 'next/link'

import styles from './CardList.module.css';
import {Card} from '../Card/Card'



export const CardsList = (props)=>{
// Возвращаем разметку компонента
return (
    <section className={styles["list-section"]}>
        {/* Заголовок раздела */}
        <h2 className={styles["list-section__title"]} id={props.id}>{props.title}</h2>
        {/* Список карточек */}
        <ul className={styles["cards-list"]}>
            {props.data.map((item) => {
                return (
                    <li className={styles["cards-list__item"]} key={item.id}>
                        {/* Ссылка на каждую карточку */}
                        {/* <Link href={`/games/${item.id}`} className={styles["card-list__link"]}> */}
                            {/* Компонент карточки */}
                            <Card {...item} />
                        {/* </Link> */}
                    </li>
                );
            })}
        </ul>
    </section>
);  
}