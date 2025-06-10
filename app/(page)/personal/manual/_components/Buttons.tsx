import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonsContainer = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center gap-6">
      <Button
        variant="defaultBlack"
        size="lg"
        label="뒤로"
        type="button"
        onClick={() => router.back()}
      />
      <Button variant="primaryFill" size="lg" label="저장" type="submit" />
    </div>
  );
};

export default ButtonsContainer;
