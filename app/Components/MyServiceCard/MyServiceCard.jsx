import Styles from "@/app/Components/ServiceCard/ServiceCard.module.css";


export const MyServiceCard = (props) => {
    return (
        <div className={Styles['card__container']}>
            <div className={Styles['card__title']}>
                Запись на услугу: {props.service_name}
            </div>
            <div className={Styles['card__body']}>
                На человека: {props.surname} {props.name} {props.patrynumic}
            </div>
            <div>
                Статус:  {props.status}
            </div>
        </div>
    )
}
