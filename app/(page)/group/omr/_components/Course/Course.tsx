import React from "react";
import { useFormContext } from "react-hook-form";
import { COURSE_LIST } from "../../../../../../libs/utils/subjectList";

const Course = () => {
  const { watch, setValue } = useFormContext();
  const courseList =
    COURSE_LIST[watch("subjectEn") as keyof typeof COURSE_LIST];

  return (
    <section>
      <div className="w-[130px] rounded-md border-2 border-black bg-white shadow-md">
        <div className="flex flex-col">
          <div className="border-b text-center text-lg font-bold">
            <span>선택과목</span>
          </div>
          <div className="flex flex-col gap-2 p-2 text-center">
            {courseList.map((item, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center justify-center gap-2"
              >
                {item.label}
                <input
                  type="radio"
                  name="course"
                  value={index}
                  className="peer hidden"
                  checked={watch("course") == item.value}
                  onChange={() => setValue("course", item.value)}
                />
                <div
                  className={`flex ${NumberButtonStyle} items-center justify-center peer-checked:border-none peer-checked:bg-[black] peer-checked:text-white`}
                ></div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const NumberButtonStyle = "h-6 w-[14px] rounded-full border";

export default Course;
