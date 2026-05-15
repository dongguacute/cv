import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { profile } from '../lib/org'

describe('App', () => {
  it('renders profile sidebar', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain(profile.name)
    expect(wrapper.text()).toContain(profile.username)
    expect(wrapper.text()).toContain(profile.contactButtonLabel)
  })
})
