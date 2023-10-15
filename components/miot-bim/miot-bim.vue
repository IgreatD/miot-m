<template>
  <view>
    <view id="viewer" class="viewer" :option="option" :change:option="model.updateOption"> </view>
  </view>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      option: {
        url: '',
        actionName: '',
      },
    };
  },

  methods: {},
};
</script>

<script module="model" lang="renderjs">
import modelMixin from './miot-bim-mixin.js'
export default {
  mixins: [modelMixin],
};
</script>

<style lang="scss" scoped>
.viewer {
  position: fixed;
  // #ifdef APP-PLUS
  top: 0;
  // #endif
  // #ifdef H5
  top: calc(var(--window-top));
  // #endif
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
