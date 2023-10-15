import { ref, computed } from 'vue';
import { formatTime } from '@/utils/date.js';

// inputType: input
const useInputType = (value, emit) => {
  // computed get set
  const inputVal = computed({
    get() {
      return value.value;
    },
    set(val) {
      emit('update:value', val);
    },
  });

  return {
    inputVal,
  };
};

// inputType: select
const useSelectType = (emit) => {
  // showSelect
  const showSelect = ref(false);
  const showMultiColumnAutoSelect = ref(false);

  // 点击 options 时，修改 input 的值
  const handleSelect = (option) => {
    emit('update:selectValue', option);
    showSelect.value = false;
  };

  const handleMultiColumnSelect = (e) => {
    emit('update:selectValue', e[1]);
    showMultiColumnAutoSelect.value = false;
  };

  return {
    showSelect,
    showMultiColumnAutoSelect,
    handleSelect,
    handleMultiColumnSelect,
  };
};

// inputType: radio
const useRadioType = (radio, emit) => {
  // calender 弹窗
  const showCalender = ref(false);

  const onCalenderChange = (e) => {
    radio.value.value = new Date(e.result);
  };

  // radioGroupChange
  const radioGroupChange = (val) => {
    emit('update:selectValue', {
      label: val,
      value: radio.value.value || new Date(),
    });
  };

  // 计算 select.value ，格式化时间
  const dateStr = computed(() => {
    if (radio.value.value) {
      return formatTime(radio.value.value, 'YYYY-MM-DD');
    }
    return '';
  });

  return {
    radio,
    dateStr,
    showCalender,
    onCalenderChange,
    radioGroupChange,
  };
};

export { useSelectType, useRadioType, useInputType };
