"use client";
import { Footer } from "../Components/Footer/Footer";
import { Header } from "../Components/Header/Header";
import { Help } from "../Components/Help/Help";
import Styles from "./Report.module.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api/config";

export default function Report() {
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState({ description: "", id_user: null });

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
      setReport((prevReport) => ({
        ...prevReport,
        id_user: parsedUserData.id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setReport({
      ...report,
      description: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/help/addReport`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(report),
      });

      if (response.ok) {
        alert("Сообщение успешно отправлено!");
      }
    } catch (err) {
      console.log("Ошибка" + err);
      alert("Произошла ошибка при отправке данных, попробуйте позже");
    }
  };

  return (
    <>
      <Header />
      <main className={Styles.main}>
        <Help />
        {userData ? (
          <>
            <h2>
              Не нашли ответа на вопрос? Или нашли ошибку в работе сервиса?
              Опишите проблему или вопрос подробнее:
            </h2>
            <form onSubmit={handleSubmit} className={Styles["form__report"]}>
              <textarea
                className={Styles["form__report__textarea"]}
                name="report"
                id="report"
                placeholder="Опишите здесь проблему или вопрос. Мы обязательно его учтём."
                value={report.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="submit"
                value="Отправить сообщение"
                className={Styles["form__submit"]}
              />
            </form>
          </>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}
