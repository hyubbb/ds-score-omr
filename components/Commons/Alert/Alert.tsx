import Button from "@/components/Commons/Form/Button/Button";
import { useAlert } from "@/libs/hooks/useAlert";
import { useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import { useRecoilValue } from "recoil";
import { isLoadingState } from "@/atoms/atom";
import { Icon } from "../Icons/Icon";

export const Alert = () => {
  const isLoading = useRecoilValue(isLoadingState);
  const { alertDataState, closeAlert } = useAlert();
  const { btnLabel, isOpen, isCancel, content, callBack, canClose } =
    alertDataState;

  const nowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.style.overflowY = "hidden";
    } else {
      html.style.overflowY = "auto";
    }
    return () => {
      html.style.overflowY = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        isCancel ? closeAlert : callBack;
      }
    };

    const clickOutside = (evt: MouseEvent) => {
      if (nowRef.current && !nowRef.current.contains(evt.target as Node)) {
        isCancel ? closeAlert : callBack;
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [callBack, isCancel, isOpen, closeAlert]);

  return (
    <>
      {isOpen && (
        <>
          <div className={BackgroundConfig}></div>
          <div className={ContainerConfig}>
            <div
              className={`${BoxConfig} ${canClose ? "pb-[30px] pt-[20px]" : "p-[30px]"}`}
              ref={nowRef}
            >
              {canClose && (
                <div className="flex self-end">
                  <Icon title="close" onClick={closeAlert} />
                </div>
              )}
              {isLoading && <Spinner />}
              <div className={TextConfig}>{content}</div>
              <div className={ButtonContainerConfig}>
                {isCancel && (
                  <Button
                    label="취소"
                    variant="defaultBlack"
                    size="md"
                    onClick={closeAlert}
                    disabled={isLoading}
                  />
                )}
                <Button
                  label={btnLabel ? btnLabel : "확인"}
                  variant="primaryFill"
                  size="md"
                  autoFocus={true}
                  onClick={callBack}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const BackgroundConfig =
  "z-[100] fixed top-0 left-0 w-full h-full bg-black/[0.3]";
const ContainerConfig =
  "flex items-center justify-center z-[100] fixed top-0 left-0 w-full h-full ";
const BoxConfig =
  "flex flex-col z-[52] min-w-[350px] w-fit h-max bg-white px-5 gap-[30px] items-center relative rounded-sm";
const TextConfig = "text-center whitespace-pre-line break-keep";
const ButtonContainerConfig = "flex gap-4";
