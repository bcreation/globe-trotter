import { describe, it, expect , vi} from 'vitest'
import { useI18n } from "vue-i18n";
import { mount , config} from '@vue/test-utils'
import CountriesAutocomplete from '../Inputs/CountriesAutocomplete.vue'
import vue from 'vue';

vi.mock("vue-i18n");
useI18n.mockReturnValue({
  t: (tKey) => tKey,
});
config.global.mocks = {
  $t: (tKey) => tKey,
};

const countriesMocked =[ {
          name: 'France', code: 'FR', capital: 'Paris', emoji: '', currencies: [
            { name: 'EUR' }
          ],
          languages: { name: 'Français' },
          phones: ['+33']
        },
        {
          name: 'Angleterre', code: 'EN', capital: 'Londres', emoji: '', currencies: [
            { name: 'LVS' }
          ],
          languages: { name: 'Anglais' },
          phones: ['+00']
        }]

describe('CountriesAutocomplete', () => {
  it('renders properly without list', () => {
    const wrapper = mount(CountriesAutocomplete, {
      props: {
        countries: []
      }
    })
    expect(wrapper.find("#suggestion").classes('hidden')).toBe(true)
  })
  it('renders properly with list',() => {
    const wrapper = mount(CountriesAutocomplete, {
      props: {
        countries:countriesMocked
      }
    })
    wrapper.find('.toggle-countries').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("#suggestion").classes('hidden')).toBe(false)
    })
  })
})
