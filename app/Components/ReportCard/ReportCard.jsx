import Styles from './ReportCard.module.css'

export const ReportCard = (props)=>{
    return(
        <div className={Styles['report-card__container']}>
                <div className={Styles['report-card__description']}>Описание отчета: {props.description}</div>
                <div className={Styles["report-card__id"]}>ID-пользователя: {props.id_user}</div>
        </div>
    )
}