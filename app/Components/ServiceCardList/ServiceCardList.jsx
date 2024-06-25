import Styles from "./ServiceCardList.module.css";
import Link from "next/link";
import {ServiceCard} from "@/app/Components/ServiceCard/ServiceCard";

export const ServiceCardList = (props) => {

    const saveServiceToLocalStorage = (services) => {
        localStorage.setItem("services", JSON.stringify(services));
    };

    return(
        <section className={Styles["list-section"]}>
            <h2 className={Styles['list-section__title']}>{props.title}</h2>
            <ul className={Styles['cards-list']}>
                {props.data.map((item) => (
                    <li key={item.id} className={Styles["card-list__item"]}>
                        <Link
                            onClick={()=> saveServiceToLocalStorage(item)}
                            href={'/servicelist/' + item.id}
                            passHref
                            className={Styles["card-list__link"]}>
                            <ServiceCard {...item}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}