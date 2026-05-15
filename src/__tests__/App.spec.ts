import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { profile, profileOrganizations, profileProjects, profileSkillIconsBanner } from '../lib/org'

describe('App', () => {
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
    expect(wrapper.text()).toContain('能力')
    const banner = wrapper.find('[data-testid="skill-icons-banner"]')
    expect(banner.exists()).toBe(true)
    expect(banner.attributes('href')).toBe(profileSkillIconsBanner.href)
    const img = banner.find('img')
    expect(img.attributes('src')).toBe(profileSkillIconsBanner.src)
  })
})
