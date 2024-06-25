import Styles from './UserCard.module.css'

export const UserCard = (props)=>{
    return(
        <div className={Styles['user-card__container']}>
                <div className="user-card__fio">
                 ФИО:   {props.surname} {props.name} {props.patrynumic}
                </div>
                <div className="user-card__login">Логин: {props.login}</div>
                <div className="user-card-email">Email: {props.email}</div>
                <div className="user-card-id">ID-пользователя: {props.id}</div>
        </div>
    )
}