import classNames from "classnames";

export const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={classNames("text-gray70 my-2 text-lg font-bold", className)}>
      {children}
    </h1>
  );
};
