import { UserCard } from "../UserCard/UserCard";
import Styles from './UsersCardList.module.css';

export const UserCardList = (props) => {

    return (
        <section className={Styles["list-section"]}>
        <h2 className={Styles['title']}>{props.title}</h2>
        <ul className={Styles['cards-list']}>
            {props.data.map((item) => (
                <li key={item.id} className={Styles["card-list__item"]}>
                        <UserCard {...item}/>
                        {item.is_blocked === true ? (
                            <button onClick={() => props.unblockUser(item.id)} className={Styles['unblock-service__btn']}>
                                Разблокировать
                            </button>
                        ) : (
                            <button onClick={() => props.blockUser(item.id)} className={Styles['block-service__btn']}>
                                Заблокировать
                            </button>
                        )}
                </li>
            ))}
        </ul>
        </section>
    );
};