'use client';
import { useState, useEffect } from "react";
import { Header } from "@/app/Components/Header/Header";
import { Footer } from "@/app/Components/Footer/Footer";
import styles from './News.module.css';
import Image from "next/image";
export default function NewsPage({ id }) {
    const [selectedNews, setSelectedNews] = useState(null); // Используем state для сохранения выбранной новости
  
    useEffect(() => {
      const newsData = JSON.parse(localStorage.getItem('selectedNews'));
      setSelectedNews(newsData);
    }, [id]); // Обновляем выбранную новость при изменении id
  
    if (!selectedNews) {
      return <div>Loading...</div>;
    }
  
    return (
        <>
    <Header/>
        <main className={styles.main}>
            <h1 className={styles['news__title']}>{selectedNews.title}</h1>

            <div className={styles["author__and__date__block"]}>
              <div className={styles["author"]}>{selectedNews.creator}</div>
               <div className={styles["date"]}>{selectedNews.date}</div>
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