'use client';
import { useState } from "react";
import Styles from "./ChangePasswordForm.module.css";
import {BASE_URL} from "../../api/config"


export const ChangePasswordForm = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedPassword = userData.password; // Предположим, что пароль хранится в поле "password" объекта userData

    // Проверяем, соответствует ли введенный старый пароль тому, который хранится в localStorage
    if (oldPassword !== storedPassword) {
        setError("Старый пароль введен неверно");
        return;
    }
    // Проверка на корректность введенных данных (например, соответствие нового пароля и его подтверждения)
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
        const response = await fetch (`${BASE_URL}/user/updateUserPassword`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                id: userData.id, 
                password: newPassword
              })
        } );

        if (response.ok) {
            console.log("Пароль успешно изменен");
            alertrt("Пароль успешно изменен");
        }
    }
    catch(error){
        console.log(error);
        console.log("Произошла ошибка при отправке данных");
    }



    onClose();
  };

  return (
    <div className={Styles.changePasswordForm}>
      <h2 className={Styles.title}>Изменить пароль</h2>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <input
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
          placeholder="Старый пароль"
          className={Styles.input}
          required
        />
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          placeholder="Новый пароль"
          className={Styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Подтвердите новый пароль"
          className={Styles.input}
          required
        />
        {error && <p className={Styles.error}>{error}</p>}
        <button type="submit" className={Styles.submitButton}>
          Изменить пароль
        </button>
      </form>
    </div>
  );
};