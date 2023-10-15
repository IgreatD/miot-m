/* 
  用于存储 token 和 refresh_token 的相关操作    
*/

// 定义 token 存储的 key
const TOKEN_KEY = 'token';
// 定义 refresh_token 存储的 key
const REFRESH_TOKEN_KEY = 'refresh_token';
// 定义 user 存储的 key
const USER_KEY = 'user';
// 定义 enterprise 存储的 key
const ENTERPRISE_KEY = 'enterprise';
// 定义 project 存储的 key
const project_KEY = 'project';

// 设置 user
function setUser(user) {
  // 将 user 存储到 uni.setStorageSync 中
  uni.setStorageSync(USER_KEY, user);
}
function setEnterprise(enterprise) {
  uni.setStorageSync(ENTERPRISE_KEY, enterprise);
}
function setProject(project) {
  uni.setStorageSync(project_KEY, project);
}

// 根据 key 获取 user
function getUser() {
  // 从 uni.getStorageSync 中获取 user
  const user = uni.getStorageSync(USER_KEY);
  // 判断 user 是否存在
  if (user) {
    // 返回 user
    return user;
  }
  // 否则返回 null
  return null;
}

// 设置 token
function setToken(token) {
  // 将 token 存储到 uni.setStorageSync 中
  uni.setStorageSync(TOKEN_KEY, token);
}

// 设置 refresh_token
function setRefreshToken(refreshToken) {
  // 将 refresh_token 存储到 uni.setStorageSync 中
  uni.setStorageSync(REFRESH_TOKEN_KEY, refreshToken);
}

// 根据 key 获取 token
function getToken() {
  // 从 uni.getStorageSync 中获取 token
  const token = uni.getStorageSync(TOKEN_KEY);
  // 判断 token 是否存在
  if (token) {
    // 返回 token
    return token;
  }
  // 否则返回 null
  return null;
}
//根据key获取enterprise
function getEnterprise() {
  const enterprise = uni.getStorageSync(ENTERPRISE_KEY);
  if (enterprise) {
    return enterprise;
  }
  return null;
}
//根据key获取project
function getProject() {
  const project = uni.getStorageSync(project_KEY);
  if (project) {
    return project;
  }
  return null;
}

// 根据 key 获取 refresh_token
function getRefreshToken() {
  // 从 uni.getStorageSync 中获取 refresh_token
  const refreshToken = uni.getStorageSync(REFRESH_TOKEN_KEY);
  // 判断 refresh_token 是否存在
  if (refreshToken) {
    // 返回 refresh_token
    return refreshToken;
  }
  // 否则返回 null
  return null;
}

// 根据 token 判断用户是否登录
function isLogin() {
  return !!getToken() && !!getUser();
}

// 清除 user
function clearUser() {
  // 从 uni.removeStorageSync 中删除 user
  uni.removeStorageSync(USER_KEY);
}
// 清除project
function clearProject() {
  uni.removeStorageSync(project_KEY);
}

// 清除 token
function clearToken() {
  // 从 uni.removeStorageSync 中删除 token
  uni.removeStorageSync(TOKEN_KEY);
}

// 清除 refresh_token
function clearRefreshToken() {
  // 从 uni.removeStorageSync 中删除 refresh_token
  uni.removeStorageSync(REFRESH_TOKEN_KEY);
}

// 清除 token 和 refresh_token
function clearAllToken() {
  clearToken();
  clearRefreshToken();
  clearUser();
  clearProject();
}

export {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY as REFRESH_TOKEN,
  setToken,
  setEnterprise,
  setProject,
  setRefreshToken,
  getToken,
  getRefreshToken,
  isLogin,
  clearAllToken,
  setUser,
  getUser,
  getProject,
};
