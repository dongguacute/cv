const lightUrls = import.meta.glob<string>('../assets/skill-icons/light/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const darkUrls = import.meta.glob<string>('../assets/skill-icons/dark/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function resolveFromMap(map: Record<string, string>, slug: string): string {
  const hit = Object.entries(map).find(([path]) => path.endsWith(`/${slug}.svg`))
  if (!hit)
    throw new Error(`缺少技能图标资源: ${slug}.svg（检查 src/assets/skill-icons/${slug}.svg）`)
  return hit[1]
}

/** 顺序与 skillicons.dev 横幅一致；增删时在 src/assets/skill-icons/light|dark/ 下放置同名 SVG */
export const SKILL_ICON_SLUGS = [
  'apple',
  'blender',
  'bootstrap',
  'cpp',
  'discord',
  'fastapi',
  'gmail',
  'kali',
  'npm',
  'obsidian',
  'qt',
  'pnpm',
  'postgres',
  'gcp',
  'opencv',
  'java',
  'pytorch',
  'raspberrypi',
  'stackoverflow',
  'unity',
  'unreal',
  'visualstudio',
  'js',
  'html',
  'css',
  'ts',
  'vue',
  'vite',
  'py',
  'go',
  'flutter',
  'vscode',
  'figma',
  'arduino',
  'astro',
  'au',
  'cloudflare',
  'docker',
  'electron',
  'git',
  'github',
  'githubactions',
  'linux',
  'md',
  'mongodb',
  'mysql',
  'nextjs',
  'nodejs',
  'nginx',
  'nuxt',
  'ps',
  'pr',
  'sqlite',
  'tailwind',
  'vercel',
  'wordpress',
  'workers',
  'ubuntu',
  'debian',
  'bash',
] as const

export type SkillIconSlug = (typeof SKILL_ICON_SLUGS)[number]

export function skillIconUrl(slug: SkillIconSlug, theme: 'light' | 'dark'): string {
  return resolveFromMap(theme === 'light' ? lightUrls : darkUrls, slug)
}
