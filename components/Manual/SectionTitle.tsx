import clsx from "clsx";

export const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={clsx("text-gray70 my-2 text-lg font-bold", className)}>
      {children}
    </h1>
  );
};
