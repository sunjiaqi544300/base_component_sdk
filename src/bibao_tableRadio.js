//反面教材后续删除

const _hashLength = 16;

const _myIframe = 'myIframe';

let Person = (function(window) {
  var Person = function(Config) {
    return new Person.fn.init(Config);
  };

  Person.fn = Person.prototype = {
    constructor: Person,
    init: function(Config) {
      //参数校验
      this.configCheck(Config);
    },
    configCheck(Config) {
      if (!Config.code) {
        return Config.onError('code参数有误');
      } else if (!Config.functionType) {
        return Config.onError('functionType参数有误');
      } else if (!(Config.data instanceof Array)) {
        return Config.onError('data参数有误');
      } else {
        let hash = this.createHash(_hashLength);
        this.creatIframe(Config, hash);
      }
    },
    creatIframe: function(Config, hash) {
      const iframe = document.createElement('iframe');
      iframe.id = _myIframe + hash;
      iframe.setAttribute('frameBorder', 0);
      iframe.style.cssText = 'border: 0 none;';
      iframe.name = _myIframe;
      iframe.style =
        'width: 700px;height: 600px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);background:#fff';
      document.body.appendChild(iframe);
      iframe.src =
        Config.url +
        '?code=' +
        Config.code +
        hash +
        '&multiple=' +
        Config.multiple +
        '&functionType=' +
        Config.functionType;
      //监听子传的值
      setTimeout(() => {
        window.addEventListener('message', event => {
          //接收数据
          var { data } = event;
          if (data.cmd === Config.code + hash) {
            console.log('确认', data);
            window.removeEventListener('message', event);
            this.destroy(hash);
            Config.onSuccess(data.params);
          }
        });
      }, 4000);
      this.sendMessage(Config, hash);
    },
    //发送数据
    sendMessage: function(Config, hash) {
      setTimeout(() => {
        document.getElementsByTagName('iframe')[0].contentWindow.postMessage(
          {
            cmd: Config.code + hash,
            params: {
              data: Config.data || []
            }
          },
          '*'
        );
      }, 2000);
    },
    destroy(hash) {
      document.getElementById(_myIframe + hash).remove();
    },
    //时间戳
    createHash: function(hashLength) {
      // 默认长度 24
      return Array.from(Array(Number(hashLength) || 24), () =>
        Math.floor(Math.random() * 36).toString(36)
      ).join('');
    }
  };

  Person.fn.init.prototype = Person.fn;

  return Person;
})(window);

export default Person;
