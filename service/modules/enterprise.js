/**
 * 获取企业列表
 */
export const getAllEnterprise = (keyword = '') => {
  return uni.$http.get("/system/defTenant/all",{params:{keyword}});
};
