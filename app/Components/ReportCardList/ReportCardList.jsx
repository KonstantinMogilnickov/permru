import { ReportCard } from '../ReportCard/ReportCard';
import Styles from './ReportCardList.module.css';

export const ReportCardList = (props) => {

    return (
        <section className={Styles["list-section"]}>
        <h2 className={Styles['title']}>{props.title}</h2>
        <ul className={Styles['cards-list']}>
            {props.data.map((item) => (
                <li key={item.id} className={Styles["card-list__item"]}>
                        <ReportCard {...item}/>
                        <button onClick={() =>props.deleteReport(item.id)} className={Styles['delete-service__btn']}>Удалить отчет</button>
                </li>
            ))}
        </ul>
        </section>
    );
};