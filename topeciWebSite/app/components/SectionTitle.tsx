type SectionTitleProps = {
    title: string;
    subtitle?: string;
    center?: boolean;
    titleColor?: string;
  };
  
  export default function SectionTitle({
    title,
    subtitle,
    center = true,
    titleColor = "#D98B5F",
  }: SectionTitleProps) {
    return (
      <div className={center ? "text-center" : ""}>
        <h2
          className="font-title text-3xl font-bold md:text-4xl"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
  
        {subtitle && (
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    );
  }