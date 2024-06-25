import Styles from "./MyServiceCardList.module.css";
import {MyServiceCard} from "@/app/Components/MyServiceCard/MyServiceCard";


export const MyServiceCardList = (props) => {
    return (
        <section className={Styles["list-section"]}>
            <ul className={Styles['cards-list']}>
                {props.data.map((item) => (
                    <li key={item.id} className={Styles["card-list__item"]}>
                            <MyServiceCard {...item}/>
                            {item.status !== 'Выполнена' && (
                            <button onClick={() => props.deleteService(item.id)} className={Styles['delete-service__btn']}>
                                Отменить регистрацию
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}