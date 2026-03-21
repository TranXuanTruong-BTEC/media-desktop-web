import { useState, useEffect } from 'react'

/**
 * Tự động fetch latest release từ GitHub API
 * @param {string} repo - "owner/repo-name"
 * @param {string} assetName - tên file .exe cần tìm trong assets
 * @returns { version, downloadUrl, fileSize, releaseDate, changelog, loading, error }
 */
export function useGithubRelease(repo, assetName) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!repo) return

    const cacheKey = `gh_release_${repo}`
    const cached   = sessionStorage.getItem(cacheKey)

    if (cached) {
      try {
        setData(JSON.parse(cached))
        setLoading(false)
        return
      } catch (_) {}
    }

    fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`)
        return r.json()
      })
      .then(releases => {
        if (!releases.length) throw new Error('No releases found')

        const latest = releases[0]

        // Tìm asset .exe theo tên
        const asset = latest.assets?.find(a =>
          assetName
            ? a.name === assetName
            : a.name.endsWith('.exe') && !a.name.includes('blockmap')
        )

        // Build changelog từ tất cả releases
        const changelog = releases.slice(0, 5).map(r => ({
          version: r.tag_name.replace(/^v/, ''),
          date: r.published_at?.slice(0, 10) || '',
          notes: r.body
            ? r.body.split('\n').find(l => l.trim())?.replace(/^[#\-*>\s]+/, '').slice(0, 120) || r.name
            : r.name || r.tag_name,
        }))

        const result = {
          version:     latest.tag_name.replace(/^v/, ''),
          releaseDate: latest.published_at?.slice(0, 10) || '',
          downloadUrl: asset?.browser_download_url
                       || `https://github.com/${repo}/releases/latest/download/${assetName || ''}`,
          fileSize:    asset ? formatBytes(asset.size) : null,
          downloadCount: asset?.download_count || 0,
          changelog,
        }

        sessionStorage.setItem(cacheKey, JSON.stringify(result))
        setData(result)
        setLoading(false)
      })
      .catch(err => {
        console.warn('GitHub API error:', err.message)
        setError(err.message)
        setLoading(false)
      })
  }, [repo, assetName])

  return { ...data, loading, error }
}

function formatBytes(bytes) {
  if (!bytes) return null
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`
}
