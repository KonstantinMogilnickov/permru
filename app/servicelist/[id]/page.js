'use client';

import Styles from './ServiceList.module.css';
import { useState, useEffect } from "react";
import { Header } from "@/app/Components/Header/Header";
import { Footer } from "@/app/Components/Footer/Footer";
import { Preloader } from "@/app/Components/Preloader/Preloader";
import InputMask from 'react-input-mask';
import {BASE_URL} from "@/app/api/config";

export default function ServicePage({ id }) {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const serviceData = JSON.parse(localStorage.getItem('services'));
        setSelectedService(serviceData);
    }, [id]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setSelectedUser(userData);
    }, [id]);

    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        patrynumic: '',
        telephone: '',
        email: '',
        userId: null,
        serviceId: null
    });



    useEffect(() => {
        if (selectedUser && selectedService) {
            setFormData(prevState => ({
                ...prevState,
                userId: selectedUser.id,
                serviceId: selectedService.id
            }));
        }
    }, [selectedUser, selectedService]);

    //отправка данных формы на сервер
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.surname === null  || formData.name === null  || formData.patrynumic  === null || formData.telephone === null  || formData.email === null ){
            alert("Заполните поля!");
        }
        else{
            try {
                const response = await fetch(`${BASE_URL}/services/post`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                const result = await response.text();
                alert(result);
                window.location.href = '/Services'
            }catch (err){
                console.log(err);
            }
        }
    };

    return (
        <>
            <Header />
            <main className={Styles.main}>
                <div>
                    {selectedService ? (
                        <>
                            <div className={Styles['service-title-container']}>
                                <h2 className={Styles['service__title']}>
                                    {selectedService.service_name}
                                </h2>
                                <div className={Styles['service__org']}>
                                    Организация которая предоставляет услугу: {selectedService.organization}
                                </div>
                                <div className={Styles['service__period']}>
                                    <span className={Styles['service__bold__text']}>  Срок предоставления услуги составляет: </span>
                                    {selectedService.period_of_service_provision} рабочий/их день/дней
                                </div>
                                <div className={Styles['service__price']}>
                                    <span className={Styles['service__bold__text']}> Цена услуги: </span>
                                    {selectedService.price}₽
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <Preloader />
                        </div>
                    )}
                    {selectedUser ? (
                        <>
                            <div className={Styles['service-reg-title']}>
                                Чтобы записаться на предоставление выбранной услуги заполните форму ниже:
                            </div>
                            <form className={Styles['service-reg-form']} onSubmit={handleSubmit}>
                                <label htmlFor="surname">Фамилия:</label>
                                <input
                                    type="text"
                                    id="surname"
                                    placeholder='Введите фамилию'
                                    value={formData.surname}
                                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                />
                                <label htmlFor="name">Имя:</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder='Введите имя'
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <label htmlFor="patrynumic">Отчество:</label>
                                <input
                                    type="text"
                                    placeholder='Введите отчество'
                                    id="patrynumic"
                                    value={formData.patrynumic}
                                    onChange={(e) => setFormData({ ...formData, patrynumic: e.target.value })}
                                />
                                <label htmlFor="telephone">Телефон:</label>
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    value={formData.telephone}
                                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                >
                                    {(inputProps) => <input {...inputProps} type="text" placeholder="Введите номер телефона" id="telephone" />}
                                </InputMask>
                                <label htmlFor="email">Email:</label>
                                <input
                                    placeholder='Введите почту'
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <button type='submit'>Отправить</button>
                            </form>
                        </>
                    ) : <div className={Styles['service__reg__warning']}>Регистрация на предоставление услуги доступна
                        только авторизованному пользователю!</div>}
                </div>
            </main>
            <Footer />
        </>
    );
}
