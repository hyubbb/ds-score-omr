import React from "react";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";

interface OmrFooterProps {
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OmrFooter: React.FC<OmrFooterProps> = ({ onSave }) => {
  const router = useRouter();

  return (
    <div className="flex justify-start gap-4">
      <Button
        type="button"
        label="뒤로가기"
        variant="defaultBlack"
        size="sm"
        onClick={() => router.back()}
      />
      <Button
        type="button"
        label="저장"
        variant="primaryFill"
        size="sm"
        onClick={onSave}
      />
    </div>
  );
};

export default OmrFooter;
