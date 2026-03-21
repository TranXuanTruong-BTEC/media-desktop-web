import { useState, useEffect } from 'react'

/**
 * Fetch GitHub Releases data — version, download count (ALL releases), changelog
 * @param {string} repo       - "owner/repo"
 * @param {string} assetName  - exact .exe filename in assets
 */
export function useGithubRelease(repo, assetName) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!repo) return

    // Cache per session — avoid hammering GitHub API on every render
    const cacheKey = `gh_release_v2_${repo}`
    const cached   = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        setData(JSON.parse(cached))
        setLoading(false)
        return
      } catch (_) {}
    }

    // Fetch up to 100 releases to sum all download counts
    fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`)
        return r.json()
      })
      .then(releases => {
        if (!releases.length) throw new Error('No releases found')

        const latest = releases[0]

        // Find the primary .exe asset in latest release
        const asset = latest.assets?.find(a =>
          assetName
            ? a.name === assetName
            : a.name.endsWith('.exe') && !a.name.includes('blockmap')
        )

        // ── Sum ALL download counts across ALL releases & ALL assets ──
        // This is the real total downloads number
        let totalDownloads = 0
        releases.forEach(release => {
          ;(release.assets || []).forEach(a => {
            // Only count .exe files, skip .blockmap, .yml, source zips
            if (
              a.name.endsWith('.exe') ||
              a.name.endsWith('.dmg') ||
              a.name.endsWith('.AppImage') ||
              a.name.endsWith('.deb')
            ) {
              totalDownloads += a.download_count || 0
            }
          })
        })

        // Build changelog from latest 5 releases
        const changelog = releases.slice(0, 5).map(r => ({
          version: r.tag_name.replace(/^v/, ''),
          date:    r.published_at?.slice(0, 10) || '',
          notes:   r.body
            ? r.body.split('\n')
                .find(l => l.trim() && !l.startsWith('#'))
                ?.replace(/^[-*>\s]+/, '')
                .slice(0, 120) || r.name
            : r.name || r.tag_name,
        }))

        const result = {
          version:       latest.tag_name.replace(/^v/, ''),
          releaseDate:   latest.published_at?.slice(0, 10) || '',
          downloadUrl:   asset?.browser_download_url
                         || `https://github.com/${repo}/releases/latest/download/${assetName || ''}`,
          fileSize:      asset ? formatBytes(asset.size) : null,
          downloadCount: totalDownloads,
          changelog,
          // Extra: star count available if needed
          repoUrl: `https://github.com/${repo}`,
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
