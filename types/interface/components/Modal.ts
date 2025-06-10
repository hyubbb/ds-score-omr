export interface IModal {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  isBtn?: boolean;
  btnName?: string;
  callBack?: () => void;
  onReset?: () => void;
  renderCount: number;
}
