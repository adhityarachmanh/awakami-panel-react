import { useMemo } from "react";

interface RichTextViewProps {
  content?: string;

  className?: string;

  formater?: (content: string) => string;
  maxLength?: number; // Tambahkan properti maxLength
}

const RichTextView = ({
  content,
  formater,
  maxLength,
}: RichTextViewProps) => {
  // Default maxLength 100

  const html = useMemo(() => {
    let formattedContent = formater ? formater(content ?? "") : content ?? "";

    if (maxLength !== undefined && formattedContent.length > maxLength) {
      formattedContent = formattedContent.substring(0, maxLength) + "...";
    }

    return formattedContent;
  }, [content, maxLength]);

  return (
    <div
      style={{ width: "100%", overflowX: "auto" }}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default RichTextView;
