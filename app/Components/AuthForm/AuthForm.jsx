'use client'
import Link from 'next/link';
import Styles from './AuthForm.module.css';
import {useState} from 'react';
import axios from 'axios'; 


/////////////////////////////////////////////////////////
export const AuthForm = (props) => {
  const [loginData, setLoginData] = useState({
      login: ''.trim(),
      password: ''.trim()
  });

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:3001/user/loginUser', loginData); //Запрос на сервер для аутентификации
          const token = response.data.token; //Получение токена в ответе от сервера
 
          localStorage.setItem('token', token);//Сохранение токена в локальное хранилище
          setIsLoginFormOpen(false);

          const userData = response.data.user;//Получение текущего пользователя
          if (userData) {
              localStorage.setItem('userData', JSON.stringify(userData));//Запись текущего пользователя в локальное хранилище
          } else {
              console.error('Данные пользователя не получены');
          }
          console.log(response.data)
          // Передаем и токен, и данные пользователя в функцию handleSuccessfulAuth
          props.close(token);
      } catch (error) {
          alert('Неправильный логин или пароль');
          console.log(error);
      }
  };

  return (
    <form  className={Styles['form']} onSubmit={handleSubmit}>
      
    <h2 className={Styles['form__title']}>Авторизация</h2>
    <div className={Styles['form__fields']}>
      <label className={Styles['form__field']}>
        <span className={Styles['form__field-title']}>Логин</span>
        <input
              value={loginData.identifier}
              onChange={handleInputChange}
              className={Styles["form__field-input"]}
              name="login"
              type="text"
              placeholder="Ваш логин"
            /> 
      </label>
      <label className={Styles['form__field']}>
        <span className={Styles['form__field-title']}>Пароль</span>
        <input className={Styles['form__field-input']} 
                value={loginData.password}
                onChange={handleInputChange}
                name="password"
                type="password"
                placeholder='***********'/>
      </label>
    </div>
    <div className={Styles['form__actions']}>
      <button className={Styles['form__submit']} type="submit">Войти</button>
    </div>

      <div className={Styles['registr_text']}>
          Нет аккаунта?<Link 
          href='/Registration' 
          className={Styles['reg_link']}
          > Создать</Link>
      </div>
  </form>
  );
};