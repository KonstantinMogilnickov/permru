import Styles from './ServiceRegCard.module.css'

export const ServiceRegCard = (props) => {
  return (
    <div className={Styles["user-card__container"]}>
      <div className="user-card__fio">
        ФИО: {props.surname} {props.name} {props.patrynumic}
      </div>
      <div className="user-card__service"> Запись на услугу: {props.service_name}</div>
      <div className="user-card__telephone">Номер телефона: {props.telephone}</div>
      <div className="user-card__telephone">Email: {props.email}</div>
      <div className="user-card-id">ID-пользователя: {props.id}</div>
    </div>
  );
};
