"use client";
import styles from "./AddNews.module.css";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";
import { useState, useEffect } from "react";

export default function AddNews() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/news/getCategories"
        );
        const data = await response.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении списка категорий:", error);
      }
    };
    

    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image_path: "",
    date: '',
    creator: "",
    id_category: "",
    id_news_status: "1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newsImage = new FormData();
      newsImage.append('image', e.target.image_path.files[0]);
      const response = await fetch("http://127.0.0.1:3001/upload", {
        method: "POST",
        body: newsImage,
      });

      console.log(formData.image_path);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Вы можете использовать данные о загруженном файле, если это необходимо
        alert("Изображение успешно загружено");

        const addNewsResponse = await fetch("http://127.0.0.1:3001/news/addNews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (addNewsResponse.ok) {
          alert("Новость успешно добавлена");
        } else {
          alert("Ошибка при добавлении новости");
        }
      } else {
        alert("Ошибка при загрузке изображения");
      }
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
  };


  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles["form"]} onSubmit={handleSubmit} enctype="multipart/form-data">
          <label htmlFor="title">Укажите заголовок:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <label htmlFor="text">Укажите основной текст:</label>
          <textarea
            name="text"
            id="text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
          />

          <label htmlFor="image_path">Укажите картинку:</label>
          <input
            type="file"
            name="image_path"
            id="image_path"
            onChange={(e) =>
                setFormData({ ...formData, image_path: `/image/${e.target.files[0].name}` })
              }
          />

          <label htmlFor="date">Укажите дату:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <label htmlFor="creator">Укажите автора:</label>
          <input
            type="text"
            name="creator"
            id="creator"
            value={formData.creator}
            onChange={(e) =>
              setFormData({ ...formData, creator: e.target.value })
            }
          />

          <label htmlFor="id_category">Укажите категорию:</label>
          <select
            name="id_category"
            id="id_category"
            value={formData.id_category}
            onChange={(e) =>
              setFormData({ ...formData, id_category: e.target.value })
            }
          >
            <option value="">Выберите категорию</option>
            {/* Проверка наличия категорий перед отображением */}
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Загрузка категорий...
              </option>
            )}
          </select>
          <button type="submit">Добавить</button>
        </form>
      </main>
      <Footer />
    </>
  );
}