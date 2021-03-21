import React from 'react'
import styles from './MetCard.module.scss'


interface IPropsMetaCard {
    artist: string;
    artworkName: string;
    description: string; 
    mintDate: string; 
    price: string; 
}

const MetaCard: React.FC<IPropsMetaCard> = ({artist, artworkName, description, mintDate, price}) => {
    return(
        <div className={styles.card}>
            <div className={styles.title}>
               {artworkName}
            </div>
            <hr className={styles.divider}></hr>
            <div className={styles.grid}>
                <div className={styles.cat}>artist</div>
                <div className={styles.metaData}>{artist}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.cat}>description</div>
                <div className={styles.description}>{description}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.cat}>mint date</div>
                <div className={styles.metaData}>{mintDate}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.cat}>price</div>
                <div className={styles.metaData}>{price}</div>
            </div>
        </div>
    )
}

export default MetaCard