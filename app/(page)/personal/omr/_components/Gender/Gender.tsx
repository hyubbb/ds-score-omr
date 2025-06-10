import React from "react";
import { useFormContext } from "react-hook-form";

const Gender = () => {
  const { watch, setValue } = useFormContext();
  const gender = [
    {
      title: "남",
      value: 1,
    },
    {
      title: "여",
      value: 2,
    },
  ];
  return (
    <section>
      <div className="w-[130px] rounded-md border-2 border-black bg-white shadow-md">
        <div className="flex flex-col">
          <div className="border-b text-center text-lg font-bold">
            <span>성별 </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-2 text-center">
            {gender.map((item, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center justify-center gap-4"
              >
                {item.title}
                <input
                  type="radio"
                  name="gender"
                  value={index}
                  className="peer hidden"
                  checked={watch("gender") === index.toString()}
                  onChange={() => setValue("gender", index.toString())}
                />
                <div
                  className={`flex h-6 w-[14px] items-center justify-center rounded-full border border-[red] text-center text-[12px] peer-checked:border-none peer-checked:bg-[black] peer-checked:text-white`}
                >
                  {item.value}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gender;
