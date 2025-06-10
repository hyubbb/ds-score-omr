"use client";

import Button from "../Form/Button/Button";

interface HomeErrorProps {
  errorTitle: string;
  handleClick?: () => void;
  isButton: boolean;
  buttonLabel?: string;
}

const HomeError = ({
  errorTitle,
  handleClick,
  isButton,
  buttonLabel = "",
}: HomeErrorProps) => {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <div>
        <p className="text-[24px] font-bold">{errorTitle}</p>
        {isButton && (
          <div className="text-right mt-[15px]">
            <Button
              label={buttonLabel}
              variant="primaryOutline"
              size="md"
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeError;
