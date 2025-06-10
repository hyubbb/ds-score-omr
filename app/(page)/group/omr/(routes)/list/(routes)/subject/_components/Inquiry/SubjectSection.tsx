const SubjectSection = ({
  title,
  width = "w-full",
  children,
  className,
}: {
  title?: string;
  width?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex max-h-fit flex-col ${width}`}>
    {title && (
      <div className={`border-b py-2 text-center text-lg font-bold`}>
        {title}
      </div>
    )}
    {children}
  </div>
);

export default SubjectSection;
