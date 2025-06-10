"use client";

import { useState } from "react";

import classNames from "classnames";
import { useFieldArray, useFormContext } from "react-hook-form";

import ThumbnailFile from "./ThumbnailFile";
import { formatFileType, removeFileName } from "@/libs/utils/format/formatType";
import { onFilePreview } from "@/libs/utils/onFileUpload";
import ThumbnailImage from "../../Image/ThumbnailImage";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "@/atoms/atom";

export interface IUploadFile {
  name: string;
  rules?: any;
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
  isOnly?: boolean;
  isThumbnail?: boolean;
  uploadLabel?: string;
  iconLabel?: string;
  isDownload?: boolean; // 클릭으로 다운로드 가능 여부
  showNoFileMessage?: boolean;
  onFileChange?: (file: File | null) => void;
}

type CommonItemType = {
  label: string;
  value: string;
};

const Upload = ({
  name,
  rules,
  height = 100,
  width = 100,
  isOnly = true,
  disabled = false,
  className,
  isThumbnail = true,
  uploadLabel = "이미지 선택",
  iconLabel = "bg-camera",
  isDownload = false,
  showNoFileMessage = true,
  onFileChange, // 추가된 프롭
}: IUploadFile) => {
  const {
    getValues,
    setError,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name,
    rules,
  });

  const nowList = getValues(name);
  const existList = nowList?.map((item: any) => {
    if (
      formatFileType(item.file_name).startsWith("application") ||
      formatFileType(item.file_name).startsWith("text")
    ) {
      return {
        label: `${item.original_name}`,
        value: `${process.env.NEXT_PUBLIC_MODE === "local" ? "" : process.env.NEXT_PUBLIC_API_URL}/files/${
          item.directory
        }/${item.file_name}`,
      };
    } else {
      return {
        label: `/files/${item.directory}/${item.file_name}`,
        value: `${process.env.NEXT_PUBLIC_MODE === "local" ? "" : process.env.NEXT_PUBLIC_API_URL}/files/${
          item.directory
        }/${item.file_name}`,
      };
    }
  });
  const [thumbnailList, setThumbnailList] = useState<CommonItemType[]>(
    existList ?? [],
  );

  function getNestedErrorMessage(errors: any, name: string) {
    const nameParts = name.split(".");
    let nestedErrors = errors;

    for (const part of nameParts) {
      if (nestedErrors && nestedErrors[part]) {
        nestedErrors = nestedErrors[part];
      } else {
        nestedErrors = null;
        break;
      }
    }

    return nestedErrors?.message || nestedErrors?.root?.message || "";
  }

  const errorMessages = getNestedErrorMessage(errors, name);
  const hasError = !!(errors && errorMessages);
  const fileArray = getValues(name);

  // 밸리데이션 체크
  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    const extension = removeFileName(name);
    if (
      !(rules?.fileExtension?.value.indexOf(extension) > -1) ||
      extension === ""
    ) {
      return false;
    }
    return true;
  };

  // 파일저장
  const saveImgFile = (e: any) => {
    const files = e.target.files;

    const handleFile = async (file: any) => {
      setIsLoading(true);

      if (!fileExtensionValid(file)) {
        setError(name, rules?.fileExtension);
        return;
      }

      if (file.size > rules?.fileMaxSize?.value) {
        setError(name, rules?.fileMaxSize);
        return;
      }

      // 이미지는 썸네일 형태로 저장
      if (file?.type?.startsWith("image")) {
        const img_url = URL.createObjectURL(file);

        if (isOnly) {
          setThumbnailList([
            {
              label: img_url,
              value: img_url,
            },
          ]);
        } else {
          setThumbnailList((prev) => [
            ...prev,
            {
              label: img_url,
              value: img_url,
            },
          ]);
        }
      } else if (
        // 파일은 이름으로 저장
        file?.type?.startsWith("application") ||
        file?.type?.startsWith("text") ||
        file?.type === ""
      ) {
        if (isOnly) {
          setThumbnailList([
            {
              label: file?.name,
              value: file?.name,
            },
          ]);
        } else {
          setThumbnailList((prev) => [
            ...prev,
            {
              label: file?.name,
              value: file?.name,
            },
          ]);
        }
      } else if (file?.type?.startsWith("video")) {
        // 비디오는 썸네일로 저장
        onFilePreview(file, (previewSrc) => {
          if (isOnly) {
            setThumbnailList([
              {
                label: previewSrc,
                value: previewSrc,
              },
            ]);
          } else {
            setThumbnailList((prev) => [
              ...prev,
              {
                label: previewSrc,
                value: previewSrc,
              },
            ]);
          }
        });
      }

      if (isOnly) {
        replace(file);
      } else {
        append(file);
      }
      clearErrors(name);

      // 상위 컴포넌트에 파일 전달
      if (onFileChange) {
        onFileChange(file);
      }

      setIsLoading(false);
    };

    if (isOnly) {
      const file = files[0];
      handleFile(file);
    } else {
      for (const file of files) {
        handleFile(file);
      }
    }
  };

  // 추가한 파일 지우기
  const deleteThumbnail = (idx: number) => {
    // remove 함수의 정의
    function removeAtIndex<T>(arr: T[], index: number): T[] {
      if (index < 0 || index >= arr.length) {
        throw new Error("Index out of range");
      }

      return arr.filter((_, i) => i !== index);
    }

    remove(idx);
    setThumbnailList((prevList) => removeAtIndex(prevList, idx));
  };

  return (
    <>
      <div className={classNames("flex items-center gap-[20px]", className)}>
        {thumbnailList?.length > 0 && isThumbnail && (
          <div className="flex flex-row flex-wrap items-center justify-start gap-[10px]">
            {thumbnailList?.map((item, idx) => {
              if (
                item.value.startsWith("blob") ||
                item.value.startsWith("data:image/png;base64") ||
                formatFileType(item.value).startsWith("image") ||
                formatFileType(item.value).startsWith("video")
              ) {
                // 사진 파일
                return (
                  <ThumbnailImage
                    width={width}
                    height={height}
                    key={item.value}
                    src={item.value}
                    isDeleteBtn={disabled ? false : true}
                    deleteImage={() => deleteThumbnail(idx)}
                    isType={
                      item.value.startsWith("blob") ||
                      formatFileType(item.value).startsWith("image")
                        ? "image"
                        : "video"
                    }
                    isDownload={isDownload}
                  />
                );
              } else {
                // 문서 파일
                return (
                  <ThumbnailFile
                    key={`thumbnail_file_apllication_${idx}`}
                    label={item.label}
                    href={item.value}
                    isDeleteBtn={true}
                    isDownload={isDownload}
                    deleteFile={() => deleteThumbnail(idx)}
                  />
                );
              }
            })}
          </div>
        )}
        {!disabled && (
          <div
            className={classNames(
              "flex h-[40px] items-center rounded border bg-white px-2",
              hasError ? "border-warning" : "border-grayDB",
            )}
          >
            <input
              type="file"
              className="sr-only"
              id={name}
              accept={rules?.fileExtension?.value
                .map((v: any) => `.${v}`)
                .join(",")}
              multiple
              onChange={(e) => saveImgFile(e)}
              disabled={disabled}
            />
            <label
              htmlFor={name}
              className={classNames(
                iconLabel,
                "h-[16px] w-[20px] bg-center bg-no-repeat",
                !disabled && "cursor-pointer",
              )}
            ></label>
            <label
              htmlFor={name}
              className={classNames(
                !disabled && "cursor-pointer",
                "mr-5 whitespace-nowrap",
              )}
            >
              {uploadLabel}
            </label>
          </div>
        )}
        {fileArray?.length === 0 && showNoFileMessage && (
          <span className="text-gray400">선택된 파일 없음</span>
        )}
      </div>
      {hasError && errorMessages && (
        <span className="text-warning">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default Upload;
