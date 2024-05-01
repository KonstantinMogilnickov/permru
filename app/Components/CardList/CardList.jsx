import Link from 'next/link';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';

export const CardsList = (props) => {

    const saveNewsToLocalStorage = (news) => {
        localStorage.setItem('selectedNews', JSON.stringify(news));
    };
    return (
        <section className={styles["list-section"]}>
            <h2 className={styles["list-section__title"]} id={props.id}>{props.title}</h2>
            <ul className={styles["cards-list"]}>
                {props.data.map((item) => (
                    <li className={styles["cards-list__item"]} key={item.id}>
                        {/* Используем Link для перехода на страницу новости */}
                        <Link onClick={() => saveNewsToLocalStorage(item)} href={`/newslist/${item.id}`} passHref className={styles["card-list__link"]}>        
                                <Card {...item} />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};