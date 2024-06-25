'use client'
import { useState, useEffect } from 'react'
import { Header } from '../Components/Header/Header'
import Styles from './ServiceControl.module.css'
import { ServiceRegCardList } from '../Components/ServiceRegCardList/ServiceCardList'
import { BASE_URL } from '../api/config';


export default function ServiceControl (){
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getUsers (){
            const response = await fetch(`${BASE_URL}/services/getAllRegUsers`);
            const data  = await response.json();
            setData(data);
        };
        getUsers();
    }, []);

    const serviceComplete  = async (serviceId) => {
        try{
            const response  = await fetch(`${BASE_URL}/services/serviceComplete`,{
                method: 'PUT',
                headers: {'Content-Type':  'application/json',
               },
               body:  JSON.stringify({id: serviceId}),
            });

            if(response.ok){
                alert('Заявка успешно завершена');
                window.location.reload();
            }else{
                alert('Ошибка при завершении заявки');
            }
        
        }catch(err){
            console.log(err);
        }
    }

    const serviceReject   = async  (serviceId)  =>  {
        try{
            const response  = await fetch(`${BASE_URL}/services/serviceReject`,{
                method: 'PUT',
                headers: {'Content-Type':  'application/json',
               },
               body:  JSON.stringify({id: serviceId}),
            });

            if(response.ok){
                alert('Заявка успешно отклонена!');
                window.location.reload();
            }else{
                alert('Ошибка при отклонении заявки');
            }
        
        }catch(err){
            console.log(err);
        }
    }
        
    return (
        <>
            <Header/>
            <main className={Styles.main}>
              
                {data.length === 0 ? <h3>Нет заявок</h3>  :  <ServiceRegCardList data={data} serviceComplete ={serviceComplete} serviceReject={serviceReject} title='Активные заявки' />}
       
               
            </main>
        </>
    )
}