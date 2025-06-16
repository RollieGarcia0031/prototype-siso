import styles from './page.module.css';

export default function Edit(){
    return (
      <div className={styles.main}>
        <div className={styles.basicInfo}>
            <InputSmall text="Name:"/>
            <InputSmall text="Address:"/>
        </div>
        <InputLarge text="Bio:"/>
      </div>
    )
}

function InputSmall({text}){
    return (
        <div className={styles.inputSmall}>
            <p className='headerText1'>{text}</p>
            <input type="text"/>
        </div>
    )
}

function InputLarge({text}){
    return (
        <div className={styles.inputLarge}>
            <p className='headerText1'>{text}</p>
            <textarea />
        </div>
    );
}