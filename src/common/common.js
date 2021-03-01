/*
 * @Descripttion: 
 * @Author: Duanlinpeng
 * @Date: 2020-10-12 18:49:58
 * @LastEditTime: 2020-12-06 16:14:36
 * @FilePath: /bm-oa-common-sdk/src/common/common.js
 */


//生成哈希数
export const createHash=(hashLength)=>{
  // 默认长度 24
  return Array.from(Array(Number(hashLength) || 24), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
};

