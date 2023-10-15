<template>
  <view class="siiri-button" :style="style" :class="[plain ? 'plain' : '', 'siiri-button-' + type]" @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
import { defineComponent, reactive, watchEffect } from 'vue';

export default defineComponent({
  name: 'SiiriButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: [Number, String],
      default: 28,
    },
    bgColor: {
      type: String,
      default: '',
    },
    minWidth: {
      type: [Number, String],
      default: 120,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: 56,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const style = reactive({
      borderRadius: props.borderRadius + 'rpx',
      minWidth: props.minWidth + 'rpx',
      height: props.height + 'rpx',
      width: props.width + 'rpx',
    });

    const setBgColor = () => {
      if (props.bgColor) {
        if (props.plain) {
          style.backgroundColor = 'transparent';
          style.borderColor = props.bgColor + '';
          style.color = props.bgColor + '';
        } else {
          style.backgroundColor = props.bgColor + '';
          style.borderColor = props.bgColor + '';
          style.color = '#ffffff';
        }
      }
    };

    watchEffect(() => {
      setBgColor();
    });

    // type === text
    if (props.type === 'text') {
      style.backgroundColor = 'transparent';
      style.borderColor = 'transparent';
      style.color = '#009999';
      style.padding = '0';
    }

    // block
    if (props.block) {
      style.width = '100%';
    }

    // click
    const handleClick = () => {
      emit('click');
    };

    onMounted(() => {
      setBgColor();
    });

    return {
      style,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.siiri-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 36rpx;
  text-align: center;
  border: 1rpx solid;
  min-width: 160rpx;
  height: 56rpx;
  font-size: 28rpx;
  box-sizing: border-box;

  &:not(:last-child) {
    margin-right: 20rpx;
  }

  &.siiri-button-primary {
    color: #ffffff;
    border-color: #009999;
    background-color: #009999;

    &.plain {
      color: #009999;
      border-color: #009999;
      background-color: #ffffff;
    }
  }

  &.siiri-button-secondary {
    color: #ffffff;
    border-color: #ff9900;
    background-color: #ff9900;

    &.plain {
      color: #ff9900;
      border-color: #ff9900;
      background-color: #ffffff;
    }
  }

  &.siiri-button-success {
    color: #ffffff;
    border-color: #00cc00;
    background-color: #00cc00;

    &.plain {
      color: #00cc00;
      border-color: #00cc00;
      background-color: #ffffff;
    }
  }

  &.siiri-button-warning {
    color: #ffffff;
    border-color: #ff9900;
    background-color: #ff9900;

    &.plain {
      color: #ff9900;
      border-color: #ff9900;
      background-color: #ffffff;
    }
  }

  &.siiri-button-danger {
    color: #ffffff;
    border-color: #ff0000;
    background-color: #ff0000;

    &.plain {
      color: #ff0000;
      border-color: #ff0000;
      background-color: #ffffff;
    }
  }

  &.siiri-button-info {
    color: #181818;
    border-color: transparent;
    background-color: #ffffff;
  }

  &.siiri-button-light {
    color: #ffffff;
    border-color: #cccccc;
    background-color: #cccccc;

    &.plain {
      color: #cccccc;
      border-color: #cccccc;
      background-color: #ffffff;
    }
  }

  &.siiri-button-dark {
    color: #ffffff;
    border-color: #333333;
    background-color: #333333;

    &.plain {
      color: #333333;
      border-color: #333333;
      background-color: #ffffff;
    }
  }
}
</style>
