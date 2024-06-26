"use client";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";
import Styles from "./Personalcabinet.module.css";
import { useState } from "react";
import { Overlay } from "../Components/Overlay/Overlay";
import { Popup } from "../Components/Popup/Popup";
import { DeleteAccountForm } from "../Components/DeleteAccountForm/DeleteAccountForm";
import { ChangePasswordForm } from "../Components/ChangePasswordForm/ChangePasswordForm";
import Link from "next/link";


////////////////////////////////////////////////////


export default function PersonalCabinet() {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [changePasswordPopupIsOpened, setChangePasswordPopupIsOpened] = useState(false);

  const isOpen = () => {
    setPopupIsOpened(true);
  };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location = '/';
    };

  const isClose = () => {
    setPopupIsOpened(false);
  };

  const openChangePasswordPopup = () => {
    setChangePasswordPopupIsOpened(true);
  };

  const closeChangePasswordPopup = () => {
    setChangePasswordPopupIsOpened(false);
  };

  return (
    <>
      <Header />
        <main className={`${Styles["main"]} ${Styles["container"]}`}>
            <h1 className={Styles["title"]}>Личный кабинет</h1>
            {userData && (
                <>
                    <div className={Styles['personal__data-container']}>
                        <div className={Styles["personal__data"]}>
                            <div className={Styles["data"]}>
                                <p className={Styles["user__data"]}>Логин: {userData.login}</p>
                                <p className={Styles["user__data"]}>
                                    Фамилия: {userData.surname}
                                </p>
                                <p className={Styles["user__data"]}>Имя: {userData.name}</p>
                                <p className={Styles["user__data"]}>
                                    Отчество: {userData.patrynumic}
                                </p>
                                <p className={Styles["user__data"]}>
                                    Электронная почта: {userData.email}
                                </p>
                            </div>

                            <div className={Styles["change"]}>
                                <button className={Styles["change__password"]} onClick={openChangePasswordPopup}>
                                    Изменить пароль
                                </button>
                                <button
                                    className={Styles["delete__account"]}
                                    onClick={isOpen}
                                >
                                    Удалить аккаунт
                                </button>
                            </div>
                        </div>
                        <button onClick={handleLogout} className={Styles['exit-btn']}>Выйти из учётной записи</button>
                    </div>

                </>
            )}

            <Overlay isOpened={popupIsOpened || changePasswordPopupIsOpened}
                     onClose={isClose || closeChangePasswordPopup}/>
            <Popup isOpen={popupIsOpened} onClose={isClose}>
                <DeleteAccountForm onClose={isClose}/>
            </Popup>

            <Popup isOpen={changePasswordPopupIsOpened} onClose={closeChangePasswordPopup}>
                <ChangePasswordForm onClose={closeChangePasswordPopup}/>
            </Popup>
        </main>
    </>
  );
}
