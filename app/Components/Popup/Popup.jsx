import Styles from './Popup.module.css'

/////////////////////////////////////////

export const Popup = (props) =>{
    return(
    <>
        {props.isOpen && (
          <div className={`${Styles['popup']} ${props.isOpen && Styles['popup_is_opened']}`}>
            <button className={Styles['close']} onClick={props.onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none">
            <path d="M3 21.32L21 3.32001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 3.32001L21 21.32" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            <div className={Styles['content']}>{props.children}</div>
          </div>
        )}
      </>
    );
  };