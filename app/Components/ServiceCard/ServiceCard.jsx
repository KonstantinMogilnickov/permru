import Styles  from './ServiceCard.module.css';

export const ServiceCard = (props) =>{
    return(
        <div className={Styles['card__container']}>
           <div className={Styles['card__title']}>
               {props.service_name}
           </div>
            <div className={Styles['card__organization']}>
                Организация: {props.organization}
            </div>
            <div className={Styles['card__price']}>
                Цена: {props.price} ₽
            </div>
        </div>
    )
}


