import meAvatar from '@/assets/avatar/me.jpg'

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
  profileUrl: string | null
}

export const profile: Profile = {
  name: 'Cherry 🍒',
  username: 'dongguacute',
  pronouns: '她/her',
  avatarSrc: meAvatar,
  statusEmoji: '🥰',
  bioLine1: '我是 Cherry🍒｜📮 联系我',
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
  profileUrl: null,
}
