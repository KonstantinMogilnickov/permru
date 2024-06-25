import { ServiceRegCard } from "../ServiceRegCard/ServiceRegCard";
import Styles from "./ServiceCardList.module.css";

export const ServiceRegCardList = (props) => {
  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["title"]}>{props.title}</h2>
      <ul className={Styles["cards-list"]}>
        {props.data.map((item) => (
          <li key={item.id} className={Styles["card-list__item"]}>
            <ServiceRegCard {...item} />
            {item.status === "1" ? (
              <>
                <div className={Styles['btn__container']}>
                <button
                  onClick={() => props.serviceComplete(item.id)}
                  className={Styles["unblock-service__btn"]}
                >
                  Выполнена
                </button>
                <button
                  onClick={() => props.serviceReject(item.id)}
                  className={Styles["block-service__btn"]}
                >
                  Отклонить
                </button>
                </div>
              </>
            ) : (
               <div>Заявка выполнена</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
