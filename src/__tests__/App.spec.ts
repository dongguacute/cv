import { mount } from '@vue/test-utils'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App.vue'
import { profile, profileOrganizations, profileProjects, profileSkillIconsBanner } from '../lib/org'
import { SKILL_ICON_SLUGS, skillIconUrl } from '../lib/skillIcons'

describe('app', () => {
  beforeEach(() => {
    localStorage.removeItem('cv-theme')
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    localStorage.removeItem('cv-theme')
    document.documentElement.classList.remove('dark')
  })

  it('renders profile sidebar', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain(profile.name)
    expect(wrapper.text()).toContain(profile.username)
    expect(wrapper.text()).toContain(profile.contactButtonLabel)
  })

  it('lists GitHub organizations with local logos', () => {
    const wrapper = mount(App)
    for (const org of profileOrganizations) {
      const link = wrapper.find(`[data-testid="org-badge-${org.login}"]`)
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe(org.url)
    }
  })

  it('lists profile projects with links', () => {
    const wrapper = mount(App)
    for (const project of profileProjects) {
      const link = wrapper.find(`[data-testid="project-${project.slug}"]`)
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe(project.url)
      expect(wrapper.text()).toContain(project.name)
    }
  })

  it('renders skill icons banner', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('工具')
    const banner = wrapper.find('[data-testid="skill-icons-banner"]')
    expect(banner.exists()).toBe(true)
    expect(banner.attributes('href')).toBe(profileSkillIconsBanner.href)
    const imgs = banner.findAll('img')
    expect(imgs.length).toBe(SKILL_ICON_SLUGS.length)
    expect(imgs[0]?.attributes('src')).toBe(skillIconUrl(SKILL_ICON_SLUGS[0], 'light'))
  })

  it('theme control persists and toggles document class', async () => {
    const wrapper = mount(App)
    expect(wrapper.find('[data-testid="theme-mode"]').exists()).toBe(true)
    await wrapper.find('[data-testid="theme-option-dark"]').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('cv-theme')).toBe('dark')
    await wrapper.find('[data-testid="theme-option-light"]').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('cv-theme')).toBe('light')
  })
})
