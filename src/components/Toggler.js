//component used to toggle between two values
import styles from './css/Toggler.module.css';

export default function Toggler({ setValue, options=[], value, className, width }) {
    const [option1, option2] = options;
    
    return(
        <div className={`${styles.toggler} ${className || ''}`}>
            <div onClick={()=>setValue(option1)} className={`${value === option1? styles.selected: ''}`}>
                {option1}
            </div>

            <div onClick={()=>setValue(option2)} className={`${value != option1? styles.selected:''}`} >
                {option2}
            </div>
        </div>
    );
}