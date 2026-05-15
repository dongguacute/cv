import meAvatar from '@/assets/avatar/me.jpg'
import orgGudupaoSpark from '@/assets/orgs/gudupaospark.png'
import orgOpenBioCard from '@/assets/orgs/openbiocard.png'

/** 侧栏文案与链接，按需在下方修改。 */
export interface Profile {
  name: string
  username: string
  pronouns: string | null
  avatarSrc: string
  /** 头像右下角状态圆贴内的符号，如 emoji */
  statusEmoji: string
  bioLine1: string
  bioLine2: string
  contactEmail: string
  /** 主按钮文案（mailto） */
  contactButtonLabel: string
  organization: { label: string, url: string } | null
  location: string | null
  /** IANA，用于「本地时间」一行 */
  timezone: string
  timeZoneLabel: string
  website: { label: string, href: string }
  youtube: { label: string, href: string }
  x: { label: string, href: string }
  github: { label: string, href: string }
  profileUrl: string | null
}

/** 侧栏 Organizations，与 github.com/dongguacute 公开资料一致；头像见 src/assets/orgs。 */
export interface ProfileOrganization {
  login: string
  logoSrc: string
  url: string
}

export const profileOrganizations: ProfileOrganization[] = [
  {
    login: 'GudupaoSpark',
    logoSrc: orgGudupaoSpark,
    url: 'https://github.com/GudupaoSpark',
  },
  {
    login: 'OpenBioCard',
    logoSrc: orgOpenBioCard,
    url: 'https://github.com/OpenBioCard',
  },
]

/** 右侧 README 下方「项目」列表；slug 用于列表项 key，按需增删改。 */
export interface ProfileProject {
  slug: string
  name: string
  description: string
  /** 仓库或项目主页 */
  url: string
}

export const profileProjects: ProfileProject[] = [
  {
    slug: 'mini-player-extension',
    name: '视频小窗浏览器扩展',
    description: '自用 Chrome 扩展：常用站点快捷入口与网页视频小窗播放。',
    url: 'https://github.com/dongguacute/Additional-Miniplayer-Extension',
  },
  {
    slug: 'openbiocard',
    name: 'OpenBioCard',
    description: '企业级电子名片系统，可配合NFC卡片一起使用',
    url: 'https://github.com/OpenBioCard',
  },
  {
    slug: 'Hilo',
    name: 'Hilo',
    description: '一个使用手机屏幕根据算法分析环境光和化妆品色号，来显示有色光来模拟妆容在自然光下的状态。',
    url: 'https://github.com/dongguacute/Hilo',
  },
  {
    slug: 'CV',
    name: 'CV',
    description: '本项目',
    url: 'https://github.com/dongguacute/cv',
  },
]

/** 右侧「能力」横幅（skillicons），由 https://skillicons.dev 生成；修改 i= 以增删图标。 */
export const profileSkillIconsBanner = {
  src: 'https://skillicons.dev/icons?i=apple,blender,bootstrap,cpp,discord,fastapi,gmail,kali,npm,obsidian,qt,pnpm,postgres,gcp,opencv,java,pytorch,raspberrypi,stackoverflow,unity,unreal,visualstudio,js,html,css,ts,vue,vite,py,go,flutter,vscode,figma,arduino,astro,au,cloudflare,docker,electron,git,github,githubactions,linux,md,mongodb,mysql,nextjs,nodejs,nginx,nuxt,ps,pr,sqlite,tailwind,vercel,wordpress,workers,ubuntu,debian,bash&theme=light',
  /** 点击横幅跳转（可改为个人主页等） */
  href: 'https://skillicons.dev',
} as const

/** 右侧 README 区展示的摘抄（对应仓库首屏大意）。 */
export const profileReadmeExcerpt = {
  filePath: 'README.md',
  heading: '哈喽，老师们欢迎看我的CV（简历）',
  tagline: '我是一个15岁的个人开发者',
  quote: '我开发过许多项目可以看我的项目列表，我在第十二届广东省创意机器人大赛中曾获得过初中组省一等奖，我开发过很多项目比如我就是为了让我所有使用的网站都有视频浏览器小窗，所以我自己弄了个浏览器小窗的插件自己用，嗯对！在GitHub上也有参与很多项目（具体可以看我的GitHub主页），有过开发Web3（去中心化）AES端到端（end-to-end）加密的即时聊天软件的经验',
} as const

export const profile: Profile = {
  name: '冬瓜有点困💤',
  username: 'dongguacute',
  pronouns: 'she/her',
  avatarSrc: meAvatar,
  statusEmoji: '🥰',
  bioLine1: '我是 冬瓜｜📮 联系我',
  bioLine2: 'me@dgct.cc',
  contactEmail: 'me@dgct.cc',
  contactButtonLabel: '发邮件联系',
  organization: {
    label: '@GudupaoSpark',
    url: 'https://github.com/GudupaoSpark',
  },
  location: '广州',
  timezone: 'Asia/Shanghai',
  timeZoneLabel: '（UTC+8）',
  website: {
    label: 'blog.dgct.cc',
    href: 'https://blog.dgct.cc',
  },
  youtube: {
    label: '@dongguacute',
    href: 'https://www.youtube.com/@dongguacute',
  },
  x: {
    label: '@CherryCuteGS',
    href: 'https://x.com/CherryCuteGS',
  },
  github: {
    label: '@dongguacute',
    href: 'https://github.com/dongguacute',
  },
  profileUrl: null,
}
