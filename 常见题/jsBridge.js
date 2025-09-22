import { getJsBridge } from '@/api/app'

class IOS {
  setupWebViewJavascriptBridge(callback) {
    if (window.webkit) {
      callback(window.webkit)
      return
    }
    if (window.WVJBCallbacks) {
      window.WVJBCallbacks.push(callback)
      return
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  // 注册JS方法
  registerhandler(name, callback) {
    this.setupWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler(name, function(data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
  // 调用App方法
  callhandler(cbName, nativeMethod = 'callNative', data, cbFunc) {
    this.setupWebViewJavascriptBridge(function(bridge) {
      if (cbFunc) {
        if (!window['nativeCallBacks']) {
          window['nativeCallBacks'] = {}
        }
        if (cbName) {
          window['nativeCallBacks'][cbName] = cbFunc
        }

        // APP目前调用的是 powerByApp，兼容下
        if (!window['powerByApp']) {
          window['powerByApp'] = {}
        }
        if (cbName) {
          window['powerByApp'][cbName] = cbFunc
        }
      }
      console.log('ios-bridge->', bridge)
      console.log('window.webkit->', window.webkit)
      bridge.messageHandlers[nativeMethod].postMessage(
        JSON.stringify(data),
        cbName
      )
      console.log('ios', JSON.stringify(data))
    })
  }
}

class Android {
  connectWebViewJavascriptBridge(callback) {
    console.log('connectWebViewJavascriptBridge')
    if (getJsBridge()) {
      console.log('window.android')
      callback(getJsBridge())
    } else {
      console.log('document.addEventListener')
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(getJsBridge())
        },
        false
      )
    }
  }
  // 注册JS方法
  registerhandler(name, callback) {
    this.connectWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler(name, function(data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
  // 调用App方法
  callhandler(cbName, nativeMethod = 'callNative', data, cbFunc) {
    console.log('callhandler', cbName, nativeMethod)
    this.connectWebViewJavascriptBridge(function(bridge) {
      if (cbFunc) {
        if (!window['nativeCallBacks']) {
          window['nativeCallBacks'] = {}
        }
        if (cbName) {
          window['nativeCallBacks'][cbName] = cbFunc
        }

        // APP目前调用的是 powerByApp，兼容下
        if (!window['powerByApp']) {
          window['powerByApp'] = {}
        }
        if (cbName) {
          window['powerByApp'][cbName] = cbFunc
        }
      }
      bridge[nativeMethod](JSON.stringify(data), cbName)
      console.log('android', JSON.stringify(data))
    })
  }
}

export { IOS, Android }
