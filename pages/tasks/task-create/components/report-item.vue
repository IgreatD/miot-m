<template>
  <view>
    <view class="report-item u-border-bottom">
      <!-- 左边的标题 -->
      <view class="report-item__title">
        {{ title }}
      </view>
      <!-- 右边的输入框 -->
      <view class="report-item__input">
        <!-- 输入框 -->
        <view v-if="inputTypes.input == inputType" class="report-item__input__input">
          <u-input
            v-model="inputVal"
            type="text"
            label-width="0"
            :placeholder="'请输入' + title"
            class="report-item__input__input__input"
            placeholder-style="color: #999999; font-size: 28rpx"
          />
        </view>
        <!-- 选择框 -->
        <view v-else-if="inputTypes.select === inputType" class="report-item__input__select">
          <view class="report-item__input__select__select">
            <view
              class="report-item__input__select__select__select"
              :class="{
                'report-item__input__select__select__select--active': selectValue.value !== '',
              }"
            >
              {{ selectValue.label || '请选择' + title }}
            </view>
          </view>
          <view class="report-item__input__select__arrow" @click="showSelect = true">
            <u-icon
              name="arrow-down"
              size="28"
              color="#999999"
              class="report-item__input__select__arrow__icon"
            />
          </view>
        </view>
        <!-- 单选框 -->
        <view v-else-if="inputTypes.radio === inputType" class="report-item__input__radio">
          <u-radio-group v-model="selectValue.label" @change="radioGroupChange">
            <u-radio
              v-for="(item, index) in options"
              :key="index"
              :name="item.label"
              active-color="#009999"
            >
              {{ item.label }}
            </u-radio>
          </u-radio-group>
          <!-- radio 未选中 -->
          <view v-if="selectValue.label === '有'" class="date__input" @click="showCalender = true">
            <text>{{ dateStr }}</text>
            <miot-icon name="shijian" color="#009999" size="32" />
          </view>
        </view>
        <!-- 侧边栏选择 -->
        <view
          v-else-if="inputTypes.selectMultiColumnAuto === inputType"
          class="report-item__input__select"
        >
          <view class="report-item__input__select__select">
            <view
              class="report-item__input__select__select__select"
              :class="{
                'report-item__input__select__select__select--active': selectValue.value !== '',
              }"
            >
              {{ selectValue.label || '请选择设备' }}
            </view>
          </view>
          <view class="report-item__input__select__arrow" @click="showMultiColumnAutoSelect = true">
            <u-icon
              name="arrow-down"
              size="28"
              color="#999999"
              class="report-item__input__select__arrow__icon"
            />
          </view>
        </view>
      </view>
    </view>
    <!-- 
      input type 为 2 时，渲染选择框弹窗
     -->
    <view v-if="inputTypes.select === inputType">
      <u-popup
        v-model="showSelect"
        mode="bottom"
        height="780rpx"
        border-radius="16"
        class="report-item__popup"
      >
        <view class="report-item__popup__content">
          <view class="report-item__popup__content__title u-border-bottom">
            请选择{{ title }}
          </view>
          <scroll-view
            scroll-y="true"
            style="height: 700rpx"
            class="report-item__popup__content__options"
          >
            <view
              v-for="(option, index) in options"
              :key="index"
              class="report-item__popup__content__options__option"
              :class="{
                'report-item__popup__content__options__option--active':
                  selectValue.value === option.value,
              }"
              @click="handleSelect(option)"
            >
              {{ option.label }}
            </view>
          </scroll-view>
        </view>
      </u-popup>
    </view>
    <!-- 
      input type 为 3 时，渲染日历弹窗
     -->
    <u-calendar
      v-if="inputTypes.radio === inputType && selectValue.label === '有'"
      v-model:modelValue="showCalender"
      mode="date"
      :min-date="today"
      :max-date="max"
      @change="onCalenderChange"
    ></u-calendar>
    <!-- 
      input type 为 2 时，渲染选择框弹窗
     -->
    <u-select
      v-if="inputTypes.selectMultiColumnAuto == inputType"
      v-model="showMultiColumnAutoSelect"
      title="选择设备"
      mode="mutil-column-auto"
      :list="options"
      @confirm="handleMultiColumnSelect"
    ></u-select>
  </view>
</template>

<script setup>
import { toRefs } from 'vue';
import { useInputType, useSelectType, useRadioType } from './type';
import { formatTime } from '@/utils/date';

// 定义输入类型枚举
const inputTypes = {
  input: 1,
  select: 2,
  radio: 3,
  selectMultiColumnAuto: 4,
};

// 定义 defineProps
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 输入类型
  inputType: {
    type: Number,
    default: 1,
  },
  // v-model
  value: {
    type: String,
    default: '',
  },
  // v-model select
  selectValue: {
    type: Object,
    default: () => ({}),
  },
  // options
  options: {
    type: Array,
    default: () => [],
  },
});

const today = formatTime(new Date(), 'YYYY-MM-DD');
const max = formatTime(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD');

// 解构 props
const { value, selectValue } = toRefs(props);

// 定义 defineEmits
const emit = defineEmits(['update:value', 'update:selectValue']);

// 使用 inputType
const { inputVal } = useInputType(value, emit);

const { handleSelect, showSelect, showMultiColumnAutoSelect, handleMultiColumnSelect } =
  useSelectType(emit);

const { dateStr, showCalender, onCalenderChange, radioGroupChange } = useRadioType(
  selectValue,
  emit,
);
</script>

<style lang="scss" scoped>
.report-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88rpx;
  padding: 0 32rpx;
  background: #ffffff;
  &__title {
    width: 180rpx;
    flex-shrink: 0;
    font-size: 28rpx;
    color: #8c9399;
    line-height: 36rpx;
  }
  &__input {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    &__input {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    &__select {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;
      &__select {
        flex: 1;
        &__select {
          width: 100%;
          height: 100%;
          font-size: 28rpx;
          color: #999999;
          &--active {
            color: #333333;
          }
        }
      }
      &__arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        &__image {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__radio {
      display: flex;
      align-items: center;
      width: 100%;
      &__radio {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .date__input {
        flex: 1;
        height: 56rpx;
        padding: 0 36rpx;
        background: #f5f7fa;
        border-radius: 36rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}

.report-item__popup {
  &__content {
    background: #ffffff;
    &__title {
      height: 80rpx;
      font-size: 28rpx;
      color: #333333;
      line-height: 36rpx;
      font-weight: 500;
      // 居中
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__options {
      &__option {
        display: flex;
        align-items: center;
        width: 100%;
        height: 88rpx;
        padding: 0 24rpx;
        font-size: 28rpx;
        color: #666666;
        line-height: 36rpx;
        background: #ffffff;
        border-bottom: 1px solid #f0f0f0;
        &--active {
          color: #009999;
        }
      }
    }
  }
}
</style>
