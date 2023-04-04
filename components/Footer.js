import React from 'react'
import styles from '../styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p> Copyright &copy; DJevents 2023 </p>
        <p>
            <Link href = '/about'>About This App</Link>
        </p>
    </footer>
  )
}



//********************************************************** */
