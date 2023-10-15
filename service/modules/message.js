/**
 * 获取消息列表
 */
export const getMessageList = () => {
  return uni.$http.get("/repair/message/noCheck/list");
};
