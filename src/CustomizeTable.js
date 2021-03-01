/*
 * @Descripttion: 
 * @Author: Duanlinpeng
 * @Date: 2020-10-12 18:49:58
 * @LastEditTime: 2021-01-19 16:19:06
 * @FilePath: /bm-oa-common-sdk/src/CustomizeTable.js
 */
import { _hashLength, _myIframe, _dialogVisible, _contentVisible } from './common/config.js';
import { createHash } from './common/common.js';
import config from '../package.json';
const FunctionTypeArr = [1, 2, 3, 4];
const Person = {
  init: function (Config) {
    console.log('I am NEW Personnel');

    // Config.url = Config.url ;
    if(Config.functionType === 4){
      if(Config.multiple===null || Config.multiple ===undefined ||Config.multiple ===true){
        Config.multiple=true;
      }else{
        Config.multiple=false;
      }
    }else{
      Config.multiple=!! Config.multiple;
    }
    Config.functionType = Config.functionType || 1;
    Config.maxLength = Config.maxLength || 100;
    Config.title = Config.functionType === 1 ? '选择人员' : Config.functionType === 2 ? '选择部门' : Config.functionType === 3 ? '选择主体' : Config.title;
    Config.justLastCheck = !!Config.justLastCheck;
    Config.isDivideAuth = !!Config.isDivideAuth;
    Config.defaultData = Config.defaultData || [];
    Config.disabledData = Config.disabledData || [];
    Config.defaultDepartment = Config.defaultDepartment || []; // 选人组件独有
    //参数校验
    this.configCheck(Config);
  },
  configCheck(Config) {
    if (!Config.code) {
      return Config.onError('code参数有误');
    } else if (!FunctionTypeArr.includes(Config.functionType)) {
      return Config.onError('functionType参数有误');
    } else if (!(Config.data instanceof Array)) {
      return Config.onError('data参数有误');
    } else if (typeof Config.maxLength !== 'number' && Config.maxLength > 5000) {
      return Config.onError('maxLength参数有误, maxLength最大值不能超过5000');
    } else if (!Array.isArray(Config.defaultData)) {
      return Config.onError('defaultData参数有误, defaultData只能传入数组');
    } else if (!Array.isArray(Config.disabledData)) {
      return Config.onError('disabledData参数有误, disabledData只能传入数组');
    } else {
      let hash = createHash(_hashLength);
      this.creatIframe(Config, hash);
    }
  },
  creatIframe: function (Config, hash) {
    //防止二次加载
    if (document.getElementById(_dialogVisible) === null) {
      const iframe_div = document.createElement('div');
      iframe_div.id = _dialogVisible;
      iframe_div.style = 'position: fixed;top: 0;bottom: 0;right: 0;left: 0;z-index:200000;overflow-y:hidden;display: flex;justify-content: center;align-items: center;';
      iframe_div.style.backgroundColor = 'rgba(0,0,0,.4)';
      document.body.appendChild(iframe_div);

      const iframe_content = document.createElement('div');
      iframe_content.id = _contentVisible;
      iframe_content.style = `position: fixed;
      z-index: 300000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;`;
      document.getElementById(_dialogVisible).appendChild(iframe_content);


      const iframe = document.createElement('iframe');
      iframe.id = _myIframe + hash;
      iframe.setAttribute('frameBorder', 0);
      iframe.style.cssText = 'border: 0 none;';
      iframe.name = _myIframe;
      iframe.style.borderRadius = '5px';
      iframe.style.backgroundColor = '#fff';
      let iframeHeight = Config.functionType === 4 ? '600px' : '500px';
      iframe.style =
        `width: 750px;height: ${iframeHeight};border-radius: 5px;overflow-y:hidden;display:block;`;
      iframe.src =
        Config.url +
        '?code=' +
        Config.code +
        hash +
        '&multiple=' +
        Config.multiple +
        '&functionType=' +
        Config.functionType +
        '&maxLength=' +
        Config.maxLength +
        '&justLastCheck=' +
        Config.justLastCheck +
        '&isDivideAuth='+
        Config.isDivideAuth;
      document.getElementById(_contentVisible).appendChild(iframe);

      //监听子传的值
      window.addEventListener('message', event => {
        //接收数据
        var { data } = event;
        // console.log(data.cmd, 'dataProp');
        if (data.cmd === Config.code + hash) {
          window.removeEventListener('message', event);
          this.destroy(hash);
          if (data.params.flag) {
            Config.onSuccess(data.params);
          }
        } else if (data.cmd === 'on' + Config.code + hash) {
          this.sendMessage(Config, hash);
        }
      });
    }
  },
  //发送数据
  sendMessage: function (Config, hash) {
    // console.log('postMessage');
    document.getElementsByTagName('iframe')[0].contentWindow.postMessage(
      {
        cmd: Config.code + hash,
        params: {
          data: Config.data || [],
          title: Config.title || '',
          maxLength: Config.maxLength,
          props: Config.props,
          defaultData: Config.defaultData,
          defaultDepartment: Config.defaultDepartment,
          disabledData: Config.disabledData,
          justLastCheck: Config.justLastCheck,
          isDivideAuth: Config.isDivideAuth,
          multiple: Config.multiple
        }
      },
      '*'
    );
  },
  // //销毁iframe
  destroy: function (hash) {
    console.log(hash);
    document.getElementById(_dialogVisible).remove();
  },
  version: config.version
};

export default Person;
