type TitleData = {
  className?: string;
  text: string;
};

const SectionTitle = ({ className = "title mb-[20px]", text }: TitleData) => {
  return (
    <div className={`${className}`}>
      <span>{text}</span>
    </div>
  );
};

export default SectionTitle;
