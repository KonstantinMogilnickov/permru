'use client'
import Styles from './page.module.css';
import { Footer } from "../Components/Footer/Footer";
import { Header } from "../Components/Header/Header";
import { CardsList } from "../Components/CardList/CardList.jsx";
import { useState, useEffect } from "react";

export default function News (){
    const [news, setNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState();
    function filterNewsByCategory(newsData, statusId) {
        return newsData.filter(news => news.id_news_status === statusId);
      };
    useEffect(() => {
        async function fetchNews() {
          try {
            const response = await fetch('http://127.0.0.1:3001/news');
            const newsData = await response.json(); // Получаем данные в формате JSON
            const filteredNews = filterNewsByCategory(newsData, "1");//фильтр по актуальности
            console.log(newsData) 
            setNews(filteredNews);
          } catch (error) {
            console.error('Ошибка при получении новостей:', error.message);
          }
        }
        fetchNews();
      }, []);
    return(
        <>
        <Header/>
        <main className={Styles.main}>
        <CardsList
              id="popular"
              title="Новости"
              data={news.slice(0, visibleNews)} // Отображаем только visibleNews записей
            />
        </main>
        <Footer/>
        </>
    )
}