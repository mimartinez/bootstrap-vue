import Vue from '../../utils/vue'
import { requestAF } from '../../utils/dom'
import bindAttrsMixin from '../../mixins/bind-attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BLink, propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

// @vue/component
export const BDropdownItem = /*#__PURE__*/ Vue.extend({
  name: 'BDropdownItem',
  mixins: [bindAttrsMixin, normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: {
    ...props,
    linkClass: {
      type: [String, Array, Object],
      default: null
    },
    variant: {
      type: String,
      default: null
    }
  },
  methods: {
    closeDropdown() {
      // Close on next animation frame to allow <b-link> time to process
      requestAF(() => {
        if (this.bvDropdown) {
          this.bvDropdown.hide(true)
        }
      })
    },
    onClick(evt) {
      this.$emit('click', evt)
      this.closeDropdown()
    }
  },
  render(h) {
    return h('li', { attrs: { role: 'presentation' } }, [
      h(
        BLink,
        {
          props: this.$props,
          staticClass: 'dropdown-item',
          class: [
            this.linkClass,
            {
              [`text-${this.variant}`]: this.variant && !(this.active || this.disabled)
            }
          ],
          attrs: { ...this.attrs$, role: 'menuitem' },
          on: { click: this.onClick },
          ref: 'item'
        },
        this.normalizeSlot('default')
      )
    ])
  }
})
