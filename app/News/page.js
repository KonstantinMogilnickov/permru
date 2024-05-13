'use client'
import Styles from './News.module.css';
import { Footer } from "../Components/Footer/Footer";
import { Header } from "../Components/Header/Header";
import { CardsList } from "../Components/CardList/CardList.jsx";
import { useState, useEffect } from "react";
import {BASE_URL} from "../api/config";

export default function News (){
    const [news, setNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState();
    function filterNewsByCategory(newsData, statusId) {
        return newsData.filter(news => news.id_news_status === statusId);
      };
    useEffect(() => {
        async function fetchNews() {
          try {
            const response = await fetch(`${BASE_URL}/news`);
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