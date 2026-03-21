export const appVersion = '2.1.0'

export const changelog = [
  { version: '2.1.0', date: '2025-03-01', notes: 'Added WebM format support and 4K downloads' },
  { version: '2.0.0', date: '2025-01-15', notes: 'Full redesign, new downloader engine' },
  { version: '1.5.2', date: '2024-11-20', notes: 'TikTok watermark removal support' },
]

export function getLatestVersion() {
  return appVersion
}

export function getLatestChangelog() {
  return changelog[0]
}
