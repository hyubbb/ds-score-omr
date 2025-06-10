import classNames from "classnames";

export type FileType = {
  label: string;
  isDeleteBtn: boolean;
  deleteFile: (e?: any) => void;
  href?: string;
  isDownload?: boolean;
  isEllipsis?: boolean;
};

const ThumbnailFile = ({
  label,
  isDeleteBtn = true,
  deleteFile,
  href,
  isDownload = false,
  isEllipsis = false,
}: Partial<FileType>) => {
  return (
    <div
      className={classNames(
        "bg-grayF1 border-grayDB flex flex-row items-center justify-center gap-2 rounded-lg border-[1px] border-solid p-2",
      )}
    >
      {isDownload ? (
        <a href={href} download={label}>
          <span className={classNames(isEllipsis && "ellipsis1")}>{label}</span>
        </a>
      ) : (
        <span className={classNames(isEllipsis && "ellipsis1")}>{label}</span>
      )}

      {isDeleteBtn && (
        <span
          onClick={deleteFile}
          className="h-[20px] w-[20px] cursor-pointer bg-[url('/icons/icon_delete-btn.svg')]"
        ></span>
      )}
    </div>
  );
};

export default ThumbnailFile;
