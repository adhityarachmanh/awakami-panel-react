import { useMemo } from "react";

interface RichTextViewProps {
  content?: string;
  className?: string;
  formater?: (content: string) => string;
}

const RichTextView = ({ content, formater }: RichTextViewProps) => {
  const html = useMemo(() => {
    return formater ? formater(content ?? "") : content ?? "";
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default RichTextView;
