<template>
  <!-- #ifdef APP-NVUE -->
  <text :style="{ color: color, 'font-size': size }" class="icon" @click="handleClick">{{
    name
  }}</text>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE  -->
  <u-icon
    custom-prefix="icon"
    :name="name"
    :size="size"
    :color="color"
    :class="className"
    @click="handleClick"
  >
  </u-icon>
  <!-- #endif -->
</template>

<script>
import { defineComponent } from 'vue';
// #ifdef APP-NVUE
var domModule = weex.requireModule('dom');
import iconUrl from '/static/iconfont/iconfont.ttf';
domModule.addRule('fontFace', {
  fontFamily: 'icon',
  src: "url('" + iconUrl + "')",
});
// #endif
export default defineComponent({
  name: 'MiotIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 'inherit',
    },
    color: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return {
      handleClick() {
        emit('click');
      },
    };
  },
});
</script>
