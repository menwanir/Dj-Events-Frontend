import React from 'react'
import Link from 'next/link'
import styles from '../styles/404.module.css'
import Layout from '@/components/Layout'
import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFound() {
  return (
    <Layout title="404 Not Found">
        <div className={styles.error}>
            <h1> <FaExclamationTriangle /> 404 Not Found</h1>
            <p>There's Nothing here</p>
            <Link href='/'>Go Back</Link>
        </div>
    </Layout>
  )
}
