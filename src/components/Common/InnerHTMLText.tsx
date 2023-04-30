interface IProps {
  content: string;
  isDescription?: boolean;
}

const InnerHTMLText = ({ content, isDescription = false }: IProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={`text-base font-serif [&>p]:mb-1 [&>p]:whitespace-pre-line [&>p>a]:whitespace-pre-line [&>p>a]:underline [&>p>a]:text-link [&>pre]:whitespace-pre-line [&>pre]:p-2 [&>pre]:bg-code [&>pre]:rounded [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-primary [&>pre>code]:font-serif [&>pre>code]:text-base md:[&>pre>code]:text-base ${
        isDescription ? "text-secondary mt-3" : "text-primary"
      }`}
    />
  );
};

export default InnerHTMLText;
