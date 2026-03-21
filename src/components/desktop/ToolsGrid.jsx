import React, { useState } from 'react'
import DesktopToolCard from './DesktopToolCard.jsx'
import { getAllCategories } from '../../data/desktopTools.js'
import styles from './ToolsGrid.module.css'

export default function ToolsGrid({ tools }) {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const categories = ['Tất cả', ...getAllCategories()]

  const filtered = activeCategory === 'Tất cả'
    ? tools
    : tools.filter(t => t.category === activeCategory)

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* Filter tabs */}
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {cat !== 'Tất cả' && (
                <span className={styles.filterCount}>
                  {tools.filter(t => t.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>Chưa có tool nào trong danh mục này.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(tool => (
              <DesktopToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
