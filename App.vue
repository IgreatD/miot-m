<script setup>
import { isLogin } from '@/utils/auth.js';
import { onLaunch } from '@dcloudio/uni-app';
import check_update from './utils/check_update/check_update';
// 根据登录状态跳转到不同页面
function checkLogin() {
  if (isLogin()) {
    // #ifdef H5
    // uni.$u.route({
    //   url: "/pages/dashboard/index",
    //   type: "switchTab",
    // });
    // #endif
  } else {
    // 重定向到登录页
    uni.$u.route({
      url: '/pages/login/login',
      type: 'redirect',
    });
  }
}

onLaunch(() => {
  // uni.preloadPage({
  //   url: '/pages/project-center/index',
  // });
  // #ifdef APP-PLUS
  check_update().catch((err) => {
    checkLogin();
  });
  // #endif
  // #ifndef APP-PLUS
  checkLogin();
  // #endif
});
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import 'uni_modules/uview-ui/index.scss';
@import '@/static/iconfont/iconfont.css';
@import '@/styles/index.scss';

/* #endif */
/* #ifdef H5 */

/* #endif */
page {
  background: #f2f4f7;
}
</style>
