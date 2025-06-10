import { useModal } from "@/libs/hooks/useModal";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isDeleteBtn: boolean;
  deleteImage: (e?: any) => void;
  isType?: string;
  isDownload: boolean;
  isGray?: boolean;
  modalReset?: () => void;
};

const ThumbnailImage = ({
  src = "",
  alt = "",
  width,
  height,
  isDeleteBtn = true,
  deleteImage,
  isType = "image",
  isDownload,
  isGray,
  modalReset,
}: Partial<Image>) => {
  const { openModal } = useModal();

  const [isImgError, setIsImgError] = useState<boolean>(false);
  const DEFAULT_IMG_SRC = "/admin/images/default_empty_img.png";

  const openBigImg = () => {
    const modalData = {
      title: "이미지 크게보기",
      content: (
        <img
          src={isImgError ? DEFAULT_IMG_SRC : src}
          alt={alt}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ),
      onReset: () => modalReset && modalReset(),
    };
    openModal(modalData);
  };

  return (
    <div className={classNames("relative")}>
      <div
        className={classNames("relative overflow-hidden aspect-auto shrink-0")}
        style={{ width, height }}
      >
        {/* img 태그 정적 경로를 위해 어쩔수없이 사용 */}
        {isDownload && !isImgError ? (
          <a href={src} download>
            <img
              src={isImgError ? DEFAULT_IMG_SRC : src}
              alt={alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={() => setIsImgError(true)}
              className={classNames(isGray && "grayscale")}
            />
          </a>
        ) : (
          <img
            src={isImgError ? DEFAULT_IMG_SRC : src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            onError={() => setIsImgError(true)}
            onClick={() => {
              !isImgError && openBigImg();
            }}
            className={classNames(
              !isImgError && "cursor-pointer",
              isGray && "grayscale"
            )}
          />
        )}
      </div>
      {isType === "video" && (
        <div className="top-0 left-0 absolute flex justify-center items-center bg-[#000000B2]/40 w-full h-full after:content-[url(/admin/icon/icon_play.svg)] z-[10]" />
      )}
      {isDeleteBtn && (
        <span
          onClick={deleteImage}
          className="cursor-pointer absolute w-[20px] h-[20px] bg-[url('/admin/icon/icon_delete-btn.svg')] top-[-7px] right-[-7px] z-10"
        ></span>
      )}
    </div>
  );
};

export default ThumbnailImage;
