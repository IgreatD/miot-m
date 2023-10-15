// 引入 ref 方法
import { ref, computed } from 'vue';
// 引入 defineStore 方法
import { defineStore } from 'pinia';
import { clearAllToken, getUser, setRefreshToken, setToken, setUser } from '@/utils/auth';
// 定义 store
export const useUserStore = defineStore('user', () => {
  // 定义 userInfo
  const userInfo = ref(getUser() || {});

  const userId = computed(() => {
    return userInfo.value.userId;
  });

  // 定义 login 方法
  const login = async (loginParams) => {
    // 调用接口登录
    uni.$service.userService.loginByUsername(loginParams).then((res) => {
      // 登录成功
      console.log(res);
      if (res) {
        loginSuccess(res);
      }
    });
  };

  const loginSms = async (loginParams) => {
    // 调用接口登录
    uni.$service.userService.loginBySms(loginParams).then((res) => {
      // 登录成功
      console.log(res);
      if (res) {
        loginSuccess(res);
      }
    });
  };

  // 定义登录成功方法
  const loginSuccess = (res) => {
    // 将用户信息赋值给 userInfo
    userInfo.value = res;
    console.log('userinfo', res);
    // 将用户信息存储到缓存中
    setUser(res);
    // 解构出 token 和 refresh_token
    const { refreshToken, token } = res;
    // 将 token 存储到缓存中
    setToken(`Bearer ${token}`);
    // 将 refresh_token 存储到缓存中
    setRefreshToken(refreshToken);
    // switch message pages
    uni.redirectTo({
      url: '/pages/project-center/index',
    });
  };

  // 定义 logout 方法
  const logout = async () => {
    return new Promise((resolve, reject) => {
      // 将用户信息清空
      userInfo.value = {};
      // 将 token 清空
      clearAllToken();
      // redirect to login page
      uni.reLaunch({
        url: '/pages/login/login',
        success: () => {
          resolve();
        },
        fail: (err) => {
          // reject(err);
        },
        complete: () => {
          resolve();
        },
      });
    });
  };

  // 定义 updateUserInfo 方法
  const updateUserInfo = async (data) => {
    // 调用接口更新用户信息
    // 将用户信息赋值给 userInfo
    return new Promise((resolve, reject) => {
      uni.$service.userService
        .updateUserInfo(data)
        .then((res) => {
          // 更新成功
          if (res) {
            userInfo.value = res;
            // 将用户信息存储到缓存中
            setUser(res);
            resolve(res);
          }
          reject(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const updateUserAccount = async (data) => {
    // 调用接口更新用户信息
    // 将用户信息赋值给 userInfo
    return new Promise((resolve, reject) => {
      uni.$service.userService
        .updateAccount(data)
        .then((res) => {
          // 更新成功
          if (res) {
            userInfo.value.username = data.username;
            // 将用户信息存储到缓存中
            setUser(res);
            resolve(res);
          }
          reject(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const updateUserPhone = async (data) => {
    // 调用接口更新用户信息
    // 将用户信息赋值给 userInfo
    return new Promise((resolve, reject) => {
      uni.$service.userService
        .updatePhone({ userId: userInfo.value.userId, ...data })
        .then((res) => {
          // 更新成功
          if (res) {
            // 将用户信息存储到缓存中
            setUser(res);
            resolve(res);
          }
          reject(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const updateUserAvatar = async (data) => {
    // 调用接口更新用户信息
    // 将用户信息赋值给 userInfo
    return new Promise((resolve, reject) => {
      uni.$service.userService
        .updateAvatar({ userId: userInfo.value.userId, userImg: data.url })
        .then((res) => {
          // 更新成功
          if (res) {
            const user = userInfo.value;
            user.userImg = res;
            // 将用户信息存储到缓存中
            setUser(user);
            resolve(res);
          }
          reject(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  return {
    userInfo,
    userId,
    login,
    loginSms,
    logout,
    updateUserInfo,
    updateUserAccount,
    updateUserPhone,
    updateUserAvatar,
  };
});
