import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('renders properly', async () => {
    const wrapper = mount(App, {});
    expect(wrapper.text()).toContain('Welcome budget 👋');
  });
});
