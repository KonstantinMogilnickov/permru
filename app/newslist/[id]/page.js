'use client';
import { useState, useEffect } from "react";
import { Header } from "@/app/Components/Header/Header";
import { Footer } from "@/app/Components/Footer/Footer";
import styles from './News.module.css';
import Image from "next/image";
import { months } from "../../utils/month";
export default function NewsPage({ id }) {
    const [selectedNews, setSelectedNews] = useState(null); // Используем state для сохранения выбранной новости
  
    useEffect(() => {
      const newsData = JSON.parse(localStorage.getItem('selectedNews'));
      setSelectedNews(newsData);
    }, [id]); // Обновляем выбранную новость при изменении id
  
    if (!selectedNews) {
      return <div>Loading...</div>;
    }

    // Преобразуем строку времени в объект Date
    const newsDate = new Date(selectedNews.date);

    // Получаем день и месяц
    const day = newsDate.getDate();
    const monthIndex = newsDate.getMonth();

    

    // Формируем строку с датой в нужном формате
    const formattedDate = `${day} ${months[monthIndex]} ${newsDate.getFullYear()}`;
  
    return (
        <>
    <Header/>
        <main className={styles.main}>
            <h1 className={styles['news__title']}>{selectedNews.title}</h1>

            <div className={styles["author__and__date__block"]}>
              <div className={styles["author"]}>{selectedNews.creator}</div>
               <div className={styles["date"]}>{formattedDate}</div>
               <div className={styles["news__category"]}>{selectedNews.category}</div>
            </div>

            <Image className={styles['news__image']} src={selectedNews.image_path} width={1000} height={500}></Image>
            <p className={styles["news__text"]}>         
              {selectedNews.text}
            </p>
        </main>
    <Footer/>
        </>
      
    );
  }
  
  NewsPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    return { id };
  };