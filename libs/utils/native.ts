declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

interface IDeviceInfo {
  app: boolean;
}

// 디바이스 정보
export const deviceInfo = (): IDeviceInfo => {
  const result = {
    app: false,
  };

  try {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toUpperCase();
      if (userAgent.indexOf('flutterInApp') > -1) {
        result.app = true;
      } else {
        result.app = false;
      }
    }
  } catch (e) {
    console.log(e);
  }

  return result;
};

// 공유하기
export const share = (text: string) => {
  window.flutter_inappwebview.callHandler('share', text);
};

// 앱 권한목록 요청
export const setPermission = async () => {
  const result = await window.flutter_inappwebview.callHandler('setPermission');
  return result;
};

// 앱 권한목록 획득
export const getPermission = async () => {
  const result = await window.flutter_inappwebview.callHandler('getPermission');
  return result;
};

// 앱 권한목록 획득
export const getFcmToken = async () => {
  const result = await window.flutter_inappwebview.callHandler('getFcmToken');
  return result;
};
