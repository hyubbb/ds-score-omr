const SubjectSection = ({
  title,
  width = "w-full",
  children,
  label,
}: {
  title?: string;
  width?: string;
  children: React.ReactNode;
  label?: string;
}) => (
  <div
    className={`flex max-h-fit flex-col rounded-lg border-2 border-black ${width} bg-white`}
  >
    {title && (
      <div className="border-b py-2 text-center text-lg font-bold tracking-widest">
        {title}
      </div>
    )}
    {label && (
      <div className="text-md border-b py-1 text-center font-semibold tracking-widest">
        {label}
      </div>
    )}
    {children}
  </div>
);

export default SubjectSection;
