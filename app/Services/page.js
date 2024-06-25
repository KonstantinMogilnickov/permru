'use client';
import Styles from './Services.module.css';
import {Header} from "../Components/Header/Header";
import {Footer} from "../Components/Footer/Footer";
import {ServiceCardList} from "../Components/ServiceCardList/ServiceCardList";
import {useState, useEffect} from "react";
import {BASE_URL} from "../api/config";
import {Preloader} from "../Components/Preloader/Preloader";
import styles from "@/app/page.module.css";

export default function Services(){
    const [services, setServices] = useState([]);
    useEffect(() => {
        async function fetchService(){
            try{
                const response  = await fetch(`${BASE_URL}/services/get`);
                const data = await response.json();
                console.log(data);
                setServices(data);
            }catch(err){
                console.log("ошибка" + err);
            }
        }
        fetchService();
    }, []);

    return(
        <>
            <Header/>
            <main className={Styles.main}>
                {services.length >0 ? (
                    <ServiceCardList
                        title = 'ДОСТУПНЫЕ УСЛУГИ'
                        data={services}
                    />
                ): (
                    <div className={styles["data__loading"]}>
                    <Preloader/>
                    </div>
                )}
            </main>
            <Footer/>
        </>
    )
}