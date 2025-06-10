const SubjectSection = ({
  title,
  width = "w-full",
  children,
}: {
  title?: string;
  width?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`flex max-h-fit flex-col rounded-lg border-2 border-black ${width}`}
  >
    {title && (
      <div className="border-b py-2 text-center text-lg font-bold tracking-widest">
        {title}
      </div>
    )}
    {children}
  </div>
);

export default SubjectSection;
