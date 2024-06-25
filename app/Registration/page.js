'use client'

import Styles from './Registration.module.css'
import { useState, useEffect} from "react";
import Image from 'next/image';
import {BASE_URL} from "../api/config";

export default function Registration (){
    const [passwordError, setPasswordError] = useState('');
    const [isPolicyChecked, setIsPolicyChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля
    const [checkboxError, setCheckboxError] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Изменяем состояние при нажатии на кнопку
    };

    const [formData, setFormData] = useState({
        login: '',
        email: '',
        name: '',
        surname: '',
        patrynumic: '',
        id_role:1,
        password:'',
        confirmPassword: ''
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password') {
            // Проверка на сложность пароля
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'/?.><,])(?=.*[^\s]).{8,}$/;
            if (!passwordRegex.test(value)) {
                setPasswordError('Пароль должен содержать не менее 8 символов, как минимум одну цифру, одну букву в верхнем регистре, одну букву в нижнем регистре и один специальный символ');
            } else {
                setPasswordError('');
            }
        }}

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Пароли не совпадают!');
            return;
        }

        if (!isPolicyChecked) {
            setCheckboxError('Вы должны согласиться с политикой конфиденциальности!');
            return;
        } else {
            setCheckboxError('');
        }

        try {
            const response = await fetch(`${BASE_URL}/user/insertUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.text();
            alert(result);
            setPasswordError('');
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка при отправке данных:', error.message);
            alert('Произошла ошибка при отправке данных');
        }

    };
    return(
        <main className={`${Styles['registration']} ${Styles['container']}`}>
            <div className={Styles["reg__title"]}>
                <h2 className={Styles["title"]}>
                    Доступ к информационным ресурсам города Перми
                </h2>
                <Image src="/image/gerb.png" alt="gerb" width={350} height={550} className={Styles['gerb']} />
            </div>
            <div className={Styles['reg_form']}>
                <h1>РЕГИСТРАЦИЯ</h1>
                <form className={Styles['form']} onSubmit={handleSubmit}>
                    <label className={Styles["label__text"]} htmlFor="email">Логин</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="Введите логин"
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required/>

                    <label className={Styles["label__text"]} htmlFor="email">email</label>

                    <input
                        className={Styles["reg__input"]}
                        placeholder="Введите email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>

                    <label className={Styles["label__text"]} htmlFor="email">Фамилия</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="Введите фамилию"
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required/>
                    <label className={Styles["label__text"]} htmlFor="email">Имя</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="Введите имя"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                    <label className={Styles["label__text"]} htmlFor="email">Отчество</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="Введите отчество"
                        type="text"
                        id="patrynumic"
                        name="patrynumic"
                        value={formData.patrynumic}
                        onChange={handleChange}
                        required/>

                    <label className={Styles["label__text"]} htmlFor="email">Пароль</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="***********"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required/>
                    <button
                        type="button"
                        className={Styles["show__password__button"]}
                        onClick={togglePasswordVisibility}>
                        {showPassword ? "Скрыть пароль" : "Показать пароль"}
                    </button>
                    <label className={Styles["label__text"]} htmlFor="email">Повторите пароль</label>
                    <input
                        className={Styles["reg__input"]}
                        placeholder="***********"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required/>
                    {/*<div*/}
                    {/*    id="captcha-container"*/}
                    {/*    className="smart-captcha"*/}
                    {/*    data-sitekey="ysc1_D1bRfReZIU3Opm8TbOynCR99iQcenEkCYgPE3D5m390a7af9">*/}
                    {/*    <input type="hidden" name="smart-token"/>*/}
                    {/*</div>*/}

                    <a href="/upload/Политика-конфиденциальности.pdf" download className={Styles['download-link']}>
                        Политика конфедициальности
                    </a>
                    <label className={Styles['policy-container']}>
                        <input
                            type="checkbox"
                            checked={isPolicyChecked}
                            onChange={(e) => setIsPolicyChecked(e.target.checked)}
                        />
                        <span className={Styles['policy']}> Ознакомлен с политикой конфиденциальности</span>
                    </label>
                    {checkboxError && <p className={Styles['error']}>{checkboxError}</p>}

                    {passwordError && <p className={Styles['error']}>{passwordError}</p>}
                    <button className={Styles['btn__registration']} type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </main>
    )
};