import crypto from "crypto-js";

/**
 * @description 加密方法
 * @param {String} content 明文
 * @param {String} secretKey 秘钥
 * @return {String} 密文
 */
function doCrypto(content, secretKey = "aesEncryptionKey") {
  const iv = crypto.enc.Utf8.parse("encryptionIntVec");
  const key = crypto.enc.Utf8.parse(secretKey);
  const contentBytes = crypto.enc.Utf8.parse(content);
  return crypto.AES.encrypt(contentBytes, key, {
    iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  }).toString();
}

/**
 * @description 加密登录参数
 * @param {Object} data 登录参数
 */
function encryptLoginParams(data) {
  return doCrypto(JSON.stringify(data));
}

export { doCrypto, encryptLoginParams };
