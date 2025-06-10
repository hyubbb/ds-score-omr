const QuestionHeader = ({
  columns = 1,
  title,
}: {
  columns?: number;
  title?: string;
}) => (
  <>
    <div className={`flex divide-x ${title ? "" : "h-10"}`}>
      {Array.from({ length: columns }, (_, index) => (
        <div
          key={index}
          className={`flex h-full w-full items-center justify-center divide-x border-b text-center font-semibold`}
        >
          <div className="flex h-full w-[50px] flex-shrink-0 items-center justify-center">
            문번
          </div>
          <div className="flex h-full flex-1 items-center justify-center tracking-[0.1em]">
            답란
          </div>
        </div>
      ))}
    </div>
  </>
);

export default QuestionHeader;
