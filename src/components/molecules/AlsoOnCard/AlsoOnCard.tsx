import { url } from 'node:inspector'
import React from 'react'
import styles from './AlsoOnCard.module.scss'

interface ICardProps {
  serviceUrl?: string
  serviceImageUrl?: string
  serviceName?: string
  nftName?: string
}

const AlsoOnCard: React.FC<ICardProps> = ({ serviceUrl, serviceImageUrl, serviceName }) => {
  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${serviceImageUrl})` }}
      ></div>
      <a href={serviceUrl} target="_blank" rel="noreferrer">
        <button className={styles.viewButton}>
          View on {serviceName}
        </button>
      </a>
      {/* <div className={styles.moreInfo}>More Info?</div> */}
    </div>
  )
}

export default AlsoOnCard
