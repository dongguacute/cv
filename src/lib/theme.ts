export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'cv-theme'

function storedMode(): ThemeMode | null {
  const v = localStorage.getItem(STORAGE_KEY)
  if (v === 'light' || v === 'dark' || v === 'system')
    return v
  return null
}

export function getThemeMode(): ThemeMode {
  return storedMode() ?? 'system'
}

function resolveDark(mode: ThemeMode): boolean {
  if (mode === 'dark')
    return true
  if (mode === 'light')
    return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** 与首屏内联脚本一致：根据模式刷新 `html.dark` */
export function applyTheme(mode: ThemeMode): void {
  document.documentElement.classList.toggle('dark', resolveDark(mode))
}

export function setThemeMode(mode: ThemeMode): void {
  localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}

/** 应用已保存偏好，并在「跟随系统」时监听系统主题变化 */
export function initTheme(): void {
  applyTheme(getThemeMode())
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemeMode() === 'system')
      applyTheme('system')
  })
}
