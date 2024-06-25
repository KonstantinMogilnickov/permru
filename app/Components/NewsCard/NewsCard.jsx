import Styles  from './NewsCard.module.css';

export const NewsCard = (props) =>{
    return(
        <div className={Styles['card__container']}>
            <div className={Styles['card__id']}>
                id: {props.id}
            </div>
            <div className={Styles['card__creator']}>
                Автор: {props.creator}
            </div>
            <div className={Styles['card__date']}>
                Дата публикации: {props.date}
            </div>
        </div>
    )
}