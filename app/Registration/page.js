'use client'
import Link from "next/link"
import Styles from './Registration.module.css'
import { useState, useEffect} from "react";
import Image from 'next/image';


export default function Registration (){
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // function onClick(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   window.smartCaptcha.execute();
  // }

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

    

    else{
      try {
        const response = await fetch('http://127.0.0.1:3001/insertUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.text();
        alert(result);
        setPasswordError('');
      } catch (error) {
        console.error('Ошибка при отправке данных:', error.message);
        alert('Произошла ошибка при отправке данных');
      }
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
        placeholder="Логин" 
        type="text" 
        id="login" 
        name="login" 
        value={formData.login} 
        onChange={handleChange} 
        required />

        <label className={Styles["label__text"]} htmlFor="email">email</label>

        <input 
        className={Styles["reg__input"]}
        placeholder="email" 
        type="email" 
        id="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        required />
        <label className={Styles["label__text"]} htmlFor="email">Имя</label>
        <input 
        className={Styles["reg__input"]}
        placeholder="Имя"
        type="text" 
        id="name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required />
        <label className={Styles["label__text"]} htmlFor="email">Фамилия</label>
        <input 
        className={Styles["reg__input"]}
        placeholder="Фамилия"
        type="text" 
        id="surname" 
        name="surname" 
        value={formData.surname} 
        onChange={handleChange} 
        required />
         <label className={Styles["label__text"]} htmlFor="email">Отчество</label>
        <input 
        className={Styles["reg__input"]}
        placeholder="отчество"
        type="text" 
        id="patrynumic" 
        name="patrynumic" 
        value={formData.patrynumic} 
        onChange={handleChange} 
        required />
        
        <label className={Styles["label__text"]} htmlFor="email">Пароль</label>
        <input 
        className={Styles["reg__input"]}
        placeholder="***********"
        type="password" 
        id="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        required />
        <label className={Styles["label__text"]} htmlFor="email">Повторите пароль</label>
        <input 
          className={Styles["reg__input"]}
          placeholder="***********"
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required />
        <div 
          id="captcha-container" 
          className="smart-captcha" 
          data-sitekey="ysc1_D1bRfReZIU3Opm8TbOynCR99iQcenEkCYgPE3D5m390a7af9">
        <input type="hidden" name="smart-token"/>
        </div>
        {passwordError && <p className={Styles['error']}>{passwordError}</p>}
        <button className={Styles['btn__registration']} type="submit">
              Зарегистрироваться
      </button>
      </form>
    </div>
      {/* <Link href="/">Вернуться на главную</Link> */}
    </main>
)
};