'use client'
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";
import Styles from './Personalcabinet.module.css'

export default function personalcabinet (){
      
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
      return (
        <>
        <Header/>
        <main className={`${Styles["main"]} ${Styles['container']}`}>
              <h1 className={Styles["title"]}>Личный кабинет</h1>
              {userData && (
                  <div className={Styles["personal__data"]}>
                      <div className={Styles["data"]}>
                      <p className={Styles["user__data"]}>Логин: {userData.login}</p>
                      <p className={Styles["user__data"]}>Фамилия: {userData.surname}</p>
                      <p className={Styles["user__data"]}>Имя: {userData.name}</p>
                      <p className={Styles["user__data"]}>Отчество: {userData.patrynumic}</p>
                      <p className={Styles["user__data"]}>Электронная почта: {userData.email}</p>
                      {userData.id_role === '3' && (
                          <button>нажми</button>
                      )}
                      </div>
                      

                  <div className={Styles["change"]}>
                    <button className={Styles["change__password"]}>Изменить пароль</button>
                      <button className={Styles["delete__account"]}>Удалить аккаунт</button>
                  </div>


                  </div>

                 
              )}              
          </main>
          <Footer/>
        </>  
      );
  };

    
