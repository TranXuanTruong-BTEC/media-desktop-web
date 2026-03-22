// Detect device type for status-gating
export function getDeviceType() {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (isIOS) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'desktop'
}

// Get effective status for current device
export function getEffectiveStatus(tool) {
  const device = getDeviceType()
  const deviceStatus = tool?.deviceStatus
  if (!deviceStatus) return tool?.status || 'active'
  // deviceStatus overrides global status per device
  return deviceStatus[device] || tool?.status || 'active'
}
