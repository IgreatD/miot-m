/**
 * 获取企业列表
 */
export const getAllProjects = (tenantId, keyword = '') => {
  return uni.$http.get('/system/baseProject/projects', { params: { key: keyword, tenantId } });
};
