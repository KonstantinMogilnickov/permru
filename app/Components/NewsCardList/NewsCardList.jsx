import Styles from './NewsCardList.module.css'
import {NewsCard} from "../NewsCard/NewsCard"


export const NewsCardList = (props) => {
    return (
        <section className={Styles["list-section"]}>
            <h2 className={Styles['list-section__title']}>{props.title}</h2>
            <ul className={Styles['cards-list']}>
                {props.data.map((item) => (
                    <li key={item.id} className={Styles["card-list__item"]}>
                        <NewsCard {...item}/>
                        <button onClick={() =>props.deleteNews(item.id)} className={Styles['delete-service__btn']}>Удалить новость</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}