'use client';
import { useState } from 'react';
import Styles from './Help.module.css'

const faqs = [
    {
        question: "Как я могу зарегистрироваться на портале?",
        answer: "Для регистрации на портале нажмите на кнопку 'Войти', далее на кнопку 'создать'"
    },
    {
        question: "Как восстановить пароль?",
        answer: "На данный момент данная функция недоступна."
    },
    {
        question: "Как подать жалобу?",
        answer: "Для подачи жалобы перейдите в раздел 'Контакты' и заполните форму обратной связи."
    },
    {
        question: "Как я могу изменить свои персональные данные?",
        answer: "Вы можете изменить свои персональные данные в личном кабинете."
    }
];
export const Help = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={Styles['help-page']}>
            <h1 className={Styles['help-page__title']}>Часто задаваемые вопросы</h1>
            <div className={Styles['faq-list']}>
                {faqs.map((faq, index) => (
                    <div key={index} className={Styles['faq-item']}>
                        <button className={Styles['faq-question']} onClick={() => handleToggle(index)}>
                            {faq.question}
                        </button>
                        {openIndex === index && <p className={Styles['faq-answer']}>{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

