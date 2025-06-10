import { isLoadingState } from "@/atoms/atom";
import Button from "@/components/Commons/Form/Button/Button";
import { Icon } from "@/components/Commons/Icons/Icon";
import { useAlert } from "@/libs/hooks/useAlert";
import { useModal } from "@/libs/hooks/useModal";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import Spinner from "../Spinner/Spinner";

export const Modal = () => {
  const isLoading = useRecoilValue(isLoadingState);
  const { alertDataState } = useAlert();
  const { isOpen: isAlertOpen } = alertDataState;
  const { modalDataState, closeModal } = useModal();
  const {
    isOpen,
    isBtn,
    title,
    content,
    callBack,
    onReset,
    btnName,
    renderCount,
    canClose,
    isCancelBtn,
  } = modalDataState;
  const nowRef = useRef<any>(null);

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
      if (!isAlertOpen && isOpen && e.key === "Escape") {
        closeModal();
        onReset && onReset();
      }
    };

    const clickOutside = (evt: MouseEvent) => {
      if (
        !isAlertOpen &&
        nowRef.current &&
        !nowRef.current.contains(evt.target as Node)
      ) {
        closeModal();
        onReset && onReset();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen, closeModal, onReset, isAlertOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed left-0 top-0 z-[100] h-full w-full bg-black/[0.3]"></div>
          <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center">
            <div
              className="z-[50] flex max-h-[90%] min-w-[400px] max-w-[800px] flex-col overflow-y-auto rounded-md bg-white p-6"
              ref={nowRef}
            >
              {canClose && (
                <div className="flex self-end">
                  <Icon
                    title="close"
                    onClick={() => {
                      closeModal();
                      onReset && onReset();
                    }}
                  />
                </div>
              )}
              {canClose} {isLoading && <Spinner />}
              {/* 리렌더링을 위한 키프롭 제공 */}
              {title && (
                <div className="mb-8 text-center text-2xl font-bold leading-9">
                  {title}
                </div>
              )}
              <div
                key={`new_modal_content_${renderCount}`}
                className="relative max-h-[90%] overflow-y-auto"
              >
                {content}
              </div>
              {isBtn && (
                <div className="mt-5 flex items-center justify-center gap-5">
                  {isCancelBtn && (
                    <Button
                      label="취소"
                      variant="defaultBlack"
                      size="lg"
                      onClick={() => {
                        closeModal();
                        onReset && onReset();
                      }}
                    />
                  )}
                  <Button
                    label={btnName ? btnName : "확인"}
                    variant="primaryFill"
                    size="lg"
                    onClick={callBack}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const TextCommonConfig = "text-2xl leading-9 font-bold mb-8 text-center";
