import { FieldValues, RegisterOptions } from "react-hook-form";

import { AxiosResponse } from "axios";
// 에러 인터페이스
export interface IError {
  config: any;
  response: {
    data: {
      message: string;
      code: number;
    };
    status: number;
  };
}

// 응답객체 인터페이스
export interface IAxiosResponse extends AxiosResponse {
  code: number;
}

export type HomeFormType = {
  date?: {
    start_at: Date;
    end_at: Date;
    period: string;
  };
  keyword: string;
  pageSize: number;
};

export interface CommonItems {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface IUseForm {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export interface menuItems {
  label: string;
  href: {
    pathname: string;
    query: object;
  };
  child?: menuItems[];
}

export type PeriodType =
  | "기간설정"
  | "오늘"
  | "1주일"
  | "1개월"
  | "3개월"
  | "6개월"
  | "12개월"
  | "전체";

export interface IColumns {
  header: string | React.ReactElement;
  name: string[];
  width?: string;
  link?: {
    pathname: string;
    slug: string;
    querystring?: string[];
    url?: string;
  };
  align?: string;
  editor?: (data?: any) => React.ReactNode;
}

export interface ILocale {
  params: {
    locale: string;
  };
}

export interface ILng {
  lng: string;
}
