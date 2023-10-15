import { ref } from "vue";

export const useCode = (phone, type) => {
  const seconds = 60;

  const codeText = ref("获取验证码");

  const uCode = ref(null);

  const canGetCode = ref(true);

  const codeChange = (val) => {
    codeText.value = val;
  };

  // 验证 phone
  const checkPhone = () => {
    if (!phone.value) {
      uni.showToast({
        title: "请输入手机号",
        icon: "none",
      });
      return false;
    }
    if (!/^1[3456789]\d{9}$/.test(phone.value)) {
      uni.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      });
      return false;
    }
    return true;
  };

  const getCode = () => {
    if (!checkPhone()) {
      return;
    }
    if (uCode.value.canGetCode) {
      codeText.value = "获取验证码";
      canGetCode.value = true;
      // 模拟向后端请求验证码
      uni.showLoading({
        title: "正在获取验证码",
      });
      uni.$service.userService
        .sendCode({
          phone: phone.value,
          type: type,
        })
        .then((res) => {
          console.log(res);
          uCode.value.start();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  };

  const codeStart = () => {
    canGetCode.value = false;
  };

  const codeEnd = () => {
    codeText.value = "重新获取";
    canGetCode.value = true;
  };

  return {
    seconds,
    codeText,
    uCode,
    canGetCode,
    codeChange,
    getCode,
    codeStart,
    codeEnd,
  };
};
