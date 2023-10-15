import { getRefreshToken, getToken } from '@/utils/auth';

// REGISTER_USER: 注册,LOGIN_USER,UPDATE_PASSWORD_USER
export const codeType = {
  REGISTER_USER: 'REGISTER_USER',
  LOGIN_USER: 'LOGIN_USER',
  UPDATE_PASSWORD_USER: 'UPDATE_PASSWORD_USER',
};

/**
 * 密码登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function loginByUsername({ username, password }) {
  return uni.$http.post('/system/defUser/login', { username, password, grantType: 'PASSWORD' });
}

/**
 * 验证码登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function loginBySms({ mobile, code }) {
  return uni.$http.post('/system/defUser/login', { mobile, code, grantType: 'MOBILE' });
}

/**
 * 刷新登录
 */
export function refreshToken() {
  const refreshToken = getRefreshToken();
  return uni.$http.post('/system/defUser/login', { refreshToken, grantType: 'REFRESH_TOKEN' });
}

/**
 * 发送验证码
 * @param {string} phone 手机号
 * @param {string} type 类型 REGISTER_USER: 注册,LOGIN_USER,UPDATE_PASSWORD_USER
 */
export function sendCode({ phone, type }) {
  return uni.$http.post('/system/verification/noToken/send', {
    mobile: phone,
    type,
  });
}

/**
 * 修改用户账号
 * @param {object} data 用户信息
 */
export function updateAccount(data) {
  return uni.$http.put('/system/defUser/username', data);
}

/**
 * 修改用户头像
 * @param {object} data 用户信息
 */
export function updateAvatar(data) {
  return uni.$http.put('/system/defUser/userImg', data);
}

/**
 * 修改用户手机号
 * @param {string} userId 用户userId
 * @param {string} mobile 新手机号
 * @param {string} code 验证码
 */
export function updatePhone({ userId, mobile, code }) {
  return uni.$http.put('/system/defUser/mobile', { userId, mobile, code });
}

/**
 * 修改密码
 * @param {string} id 用户userId
 * @param {string} oldPassword 密码
 * @param {string} password 密码
 * @param {string} confirmPassword 确认密码
 */
export function updatePassword({ id, password, oldPassword, confirmPassword }) {
  return uni.$http.put('/system/defUser/password', {
    id,
    password,
    confirmPassword,
    oldPassword,
  });
}

export function getAdminByUserId(projectId, userId) {
  return uni.$http.get('/system/projectRole/user/resIds', {
    params: {
      projectId,
      userId,
    },
  });
}
