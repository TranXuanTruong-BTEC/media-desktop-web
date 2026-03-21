import React from 'react'
import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import styles from './Toast.module.css'

// Usage: window.dispatchEvent(new CustomEvent('toast', { detail: { message, type } }))
export function showToast(message, type = 'success') {
  window.dispatchEvent(new CustomEvent('toast', { detail: { message, type } }))
}

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, ...e.detail }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3500)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  const dismiss = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]} animate-slide-up`}>
          <span className={styles.icon}>
            {toast.type === 'error'
              ? <AlertCircle size={16} />
              : <CheckCircle size={16} />
            }
          </span>
          <span className={styles.message}>{toast.message}</span>
          <button className={styles.dismiss} onClick={() => dismiss(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
