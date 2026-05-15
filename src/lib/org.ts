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

/** 右侧 README 区展示的摘抄（对应仓库首屏大意）。 */
export const profileReadmeExcerpt = {
  filePath: 'dongguacute/README.md',
  heading: '🎀 ૮ ˶ᵔ ᵕ ᵔ˶ ა Welcome to my World! 🍃',
  tagline: '15-year-old Student Dev | C++ & Python Lover | Dreaming in Code',
  quote: 'Collecting stardust and writing scripts. Balabababa~ 🎵',
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
