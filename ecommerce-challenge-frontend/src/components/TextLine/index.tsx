const TextLine: React.FC<{
  title: string;
  content: string;
  isDangerHTML?: boolean;
}> = ({ content, title, isDangerHTML = false }) => {
  if (!content) return <></>;
  return (
    <div className="flex gap-1">
      <p className="w-15 flex-shrink-0 text-lg font-semibold text-gray-700">
        {title}
      </p>
      <p>:</p>
      {isDangerHTML ? (
        <p
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></p>
      ) : (
        <p className="font-light text-md text-gray-500">{content}</p>
      )}
    </div>
  );
};

export default TextLine;
