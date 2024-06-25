'use client'
import {Header} from "@/app/Components/Header/Header";
import {Footer} from "@/app/Components/Footer/Footer"
import Styles from './Myservices.module.css'
import {MyServiceCardList} from "@/app/Components/MyServiceCardList/MyServiceCardList";
import {useEffect, useState} from "react";
import {BASE_URL} from "@/app/api/config";

export default function MyServices(){
    const [services, setServices] = useState([]);
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    useEffect(() => {
        async function fetchService(){
            try{
                const response  = await fetch(`${BASE_URL}/services/getservicereg`);
                const data = await response.json();

                if (userData && userData.id) {
                    const filteredServices = data.filter(service => service.user_id === userData.id);
                    setServices(filteredServices);
                    console.log(data);
                } else {
                    setServices([]);
                }
            } catch(err){
                console.log("ошибка: " + err);
            }
        }
        fetchService();
    }, [userData]);

    const deleteService = async (serviceID) =>{
        console.log(`Запрос на удаление услуги с ID: ${serviceID}`);
        try {
            const response = await fetch(`${BASE_URL}/services/deleteMyService`,{
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: serviceID})
            });

            if(response.ok){
                console.log(`Услуга с ID: ${serviceID} успешно удалена`);
                setServices(prevServices => prevServices.filter(service => service.id !== serviceID));
            }else console.log('Произошла ошибка при удалении услуги');

        }catch (err){
            console.log(err);
        }
    };

    return(
        <>
            <Header/>
            <main className={Styles.main}>
                {services.length ===0 ? (
                        <div className={Styles['warning']}>На данный момент у вас нет активных заявок на услуги</div>
                ):(
                    <MyServiceCardList deleteService={deleteService} title='Мои услуги' data={services}/>
                )}

            </main>
            <Footer/>
        </>
    )
}
