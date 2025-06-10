export interface IAlert {
  isOpen: boolean;
  content: JSX.Element | string;
  isCancel?: boolean;
  callBack?: () => void;
  btnLabel?: string;
  canClose?: boolean;
}
