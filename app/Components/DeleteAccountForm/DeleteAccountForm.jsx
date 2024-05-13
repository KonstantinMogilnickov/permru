import Styles from './DeleteAccountForm.module.css'
import {BASE_URL} from "../../api/config";

export const DeleteAccountForm = (props) => {

    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);

    const onDelete = async () => {
        try{
            const response = await fetch(`${BASE_URL}/user/deleteAccount`,{
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userData.id }),
            });

            if(response.ok){
                localStorage.removeItem("userData");
                window.location.href = "/";
                localStorage.removeItem("token");
            }
            else{
                alert("Произошла ошибка при удалении аккаунта! Попробуйте позже");
            }
        }
        catch(err){
            console.log(err);
        }
    };

    return(
    <div className={Styles["delete-account-form"]}>
                <h2>Подтверждение удаления аккаунта</h2>
                <p>Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.</p>
                <div className={Styles["button-container"]}>
                    <button onClick={onDelete}>Удалить аккаунт</button>
                    <button onClick={props.onClose}>Отмена</button>
                </div>
            </div>
    );

};