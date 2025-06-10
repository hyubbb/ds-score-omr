// 로그인
export interface IReqAuthLogin {
  login_email: string;
  login_pw: string;
}

// 소셜 로그인 Oauth
export interface IReqOauth2Auth {
  provider_id: string;
  provider_access_token: string;
  email: string;
}

// 이메일 인증 요청
export interface IReqAuthEmail {
  email: string; // 이메일 인증 시에 받는 인증 코드
  at: string;
  nickname?: string // 비밀번호 재설정 시에 사용
}

// 이메일 인증 확인
export interface IReqValidateEmail {
  auth_code: string; // 이메일 인증 시에 받는 인증 코드
  token: string;
}
