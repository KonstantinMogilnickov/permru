'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useState, useEffect} from "react";
import { CardsList } from "./Components/CardList/CardList";
import { Preloader } from "./Components/Preloader/Preloader";


//////////////////////////////////////////////////////////////


export default function Home() {
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState(2);
  function handleShowMore() {
    setVisibleNews((prevVisibleNews) => prevVisibleNews + 2); // Показываем по две новостные записи
  };
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('http://127.0.0.1:3001/news');
        const newsData = await response.json(); // Получаем данные в формате JSON
        const filteredNews = filterNewsByCategory(newsData, "1");
        console.log(newsData) // Фильтруем новости по категории
        setNews(filteredNews);
      } catch (error) {
        console.error('Ошибка при получении новостей:', error.message);
        
      }
    }
    fetchNews();
  }, []);

  function filterNewsByCategory(newsData, statusId) {
    return newsData.filter(news => news.id_news_status === statusId);
  }
  return (
    <>
    <Header/>
    <main className={styles.main}>
      {news.length > 0 ? (
          <>
            <CardsList
              id="popular"
              title="Новости"
              data={news.slice(0, visibleNews)} // Отображаем только visibleNews записей
            />
            {news.length > visibleNews && ( // Показываем кнопку только если есть еще записи для отображения
              <button onClick={handleShowMore} className={styles['show__more']}>
                Показать больше
              </button>
            )}
          </>
        ) : (
          <div className={styles["data__loading"]}>
            <Preloader/>
          </div>
        )}
    </main>
    <Footer/>
    </>
    
  );
}
