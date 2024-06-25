"use client";
import { Header } from "../Components/Header/Header";
import Styles from "./AdminPanel.module.css";
import { UserCardList } from "../Components/UsersCardList/UsersCardList.jsx";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api/config";
import { ReportCardList } from "../Components/ReportCardList/ReportCardList";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [report, setReports] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`${BASE_URL}/user/getAllUsers`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  useEffect(()  => {
    async function getReports() {
        try {
          const response = await fetch(`${BASE_URL}/help/getReports`);
          const data = await response.json();
          setReports(data);
        } catch (err) {
          console.log(err);
        }
      }
      getReports();
  }, []);

  const blockUser = async (userId) => {
    console.log("Запрос на блокировку пользователя с " + userId);
    try {
      const response = await fetch(`${BASE_URL}/user/blockUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        alert("Пользователь заблокирован!");
        window.location.reload();
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function unblockUser (userId) {
    console.log("Запрос на разблокировку пользователя с " + userId);
    try {
      const response = await fetch(`${BASE_URL}/user/unBlockUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        alert("Пользователь разблокирован!");
        window.location.reload();
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (err) {
      console.log(err);
    }
  };


  async function deleteReport (reportId) {
    try {
      const response = await fetch(`${BASE_URL}/help/deleteReport`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reportId }),
      });
      if (response.ok) {
        alert("Отчет удален");
        setReports(report.filter(report => report.id !== reportId));
      } else {
        alert("Не удалось удалить отчет");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header/>
      <main className={Styles.main}>
            <h3 className={Styles['h3']}>
              Админ панель
            </h3>
        <div className={Styles["container"]}>
          {users.length === 0 ? (
            <h3>Нет пользователей</h3>
          ) : (

 
            <UserCardList
              data={users}
              blockUser={blockUser}
              unblockUser = {unblockUser}
              title="Список пользователей системы"/>
       
          )}
          {report.length === 0 ? (
            <h3 className={Styles['no-reports']}>Нет отчетов</h3>
          ) : (
            <ReportCardList
              data={report}
              title="Список отчетов"        
              deleteReport={deleteReport}       
            />
          )}
        </div>
      </main>
    </>
  );
}
