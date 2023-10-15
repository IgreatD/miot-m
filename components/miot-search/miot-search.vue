<template>
  <view class="miot-search">
    <view class="miot-search__box" :class="{ 'is-active': showSync }">
      <view class="miot-search__box-icon-search">
        <miot-icon :color="showSync ? '#0f5499' : '#A4ACB3'" name="sousuo" size="34" />
      </view>
      <input type="text" :placeholder="placeholder" v-model="searchVal" @confirm="confirm" @blur="blur" @focus="emitFocus"
        confirm-type="search" :focus="showSync" />
      <icon color="#c0c4cc" size="15" type="clear" v-if="clearButton && searchVal"
        class="u-flex miot-search__box-icon-clear" @click="clear" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    clearButton: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请输入关键词进行搜索",
    },
    value: {
      type: [Number, String],
      default: "",
    },
    modelValue: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return { showSync: false, searchVal: "" };
  },
  computed: {
    valueCom() {
      // #ifndef VUE3
      return this.value;
      // #endif

      // #ifdef VUE3
      return this.modelValue;
      // #endif
    },
  },
  watch: {
    valueCom: {
      immediate: true,
      handler(newVal) {
        this.searchVal = newVal;
      },
    },
    focus: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.showSync = true;
          });
        }
      },
    },
    searchVal(newVal) {
      this.$emit("input", newVal);
      this.$emit("update:modelValue", newVal);
    },
  },
  methods: {
    clear() {
      this.$emit("clear", {
        value: this.searchVal,
      });
      this.searchVal = "";
    },
    confirm() {
      // #ifndef APP-PLUS
      uni.hideKeyboard();
      // #endif
      // #ifdef APP-PLUS
      plus.key.hideSoftKeybord();
      // #endif
      this.showSync = false;
      this.$emit("confirm", {
        value: this.searchVal,
      });
    },
    blur() {
      // #ifndef APP-PLUS
      uni.hideKeyboard();
      // #endif
      // #ifdef APP-PLUS
      plus.key.hideSoftKeybord();
      // #endif
      this.showSync = false;
      this.$emit("blur", {
        value: this.searchVal,
      });
    },
    emitFocus(e) {
      this.showSync = true;
      this.$emit("focus", e.detail);
    },
  },
};
</script>

<style lang="scss" scoped>
$u-spacing-col: 28rpx;
$u-spacing-row: 16rpx;
.miot-search
{
  display: flex;
  flex-direction: row;
  position: relative;
  &__box
  {
    display: flex;
    height: 72rpx;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    flex: 1;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border-radius: 36rpx;
    border: 1rpx solid transparent;
    padding-right: $u-spacing-col;
    &.is-active
    {
      border-color: $u-type-primary;
    }
    &-icon-search
    {
      display: flex;
      flex-direction: row;
      padding: 0 $u-spacing-row 0 $u-spacing-col;
      justify-content: center;
      align-items: center;
      color: #808080;
    }
    input
    {
      flex: 1;
      font-size: 28rpx;
      .input-placeholder
      {
        color: #a4acb3;
      }
      caret-color: $u-type-primary;
    }
    &-icon-clear
    {
      padding-left: $u-spacing-col;
      align-items: center;
      /* #ifdef H5 */
      cursor: pointer;
      /* #endif */
    }
  }
}
</style>
