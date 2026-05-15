import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { profile, profileOrganizations } from '../lib/org'

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
})
