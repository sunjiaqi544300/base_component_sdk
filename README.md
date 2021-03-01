<!--
 * @Descripttion: 
 * @Author: Duanlinpeng
 * @Date: 2020-10-12 18:49:58
 * @LastEditTime: 2020-10-20 16:44:55
 * @FilePath: /bm-oa-common-sdk/README.md
-->
# webpack打包sdk  发布npm
# ** 
# sunjiaqi
# 2412772489@qq.com
#

# 注意
  每次更新npm文件发布，都要改version

## Project commonSDK


npm install

### Compiles and minifies for production


npm run build


### npm 发布
  npm login
  npm publish 



## 使用方式   
  第一步：npm install  hwl.oa.commonsdk -save

  第二步：import sdk from "hwl.oa.commonsdk/lib/common-SDK"

  第三步：sdk.CustomizeTable.init(data)  
        参数data:Object

## 例如：
    sdk.CustomizeTable.init({
        url: "http://test.oan.zhiyinlou.com/components",
        code: "bpm",
        // title: "自定义多选",
        //组件类 型选人1；选部门2，选主题3，自定义组件4
        functionType: 4,
        // 单选false，多选true，默认true
        // multiple: false,
        //最大数  非必填
        maxLength: 1000,
        //参数
        data: [
          {
            t1__code: "v_zhangqinglei",
            t1__id: "1",
            t1__name: "张庆雷",
            t1__sex: "1"
          }
        ],
        //请求参数
        props: {
          dblinkCode: 2,
        },
        //成功回调
        onSuccess: function(result) {
          console.log(result);
        },
        //取消回调
        onError: function(err) {
          console.log(err);
        }
      });