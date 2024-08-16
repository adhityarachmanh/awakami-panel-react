import { useMemo } from "react";

const QuillViewTailwindCss = ({ content }: { content: string }) => {
  const html = useMemo(() => {
    return content
    // Alignment
    .replace(/ql-align-center/g, "wd-text-center")
    .replace(/ql-align-right/g, "wd-text-right")
    .replace(/ql-align-justify/g, "wd-text-justify")
    .replace(/ql-align-left/g, "") // Default, no class needed

    // Text size
    .replace(/ql-size-small/g, "wd-text-sm")
    .replace(/ql-size-large/g, "wd-text-lg")
    .replace(/ql-size-huge/g, "wd-text-xl")

    // Text styles
    .replace(/ql-bold/g, "wd-font-bold")
    .replace(/ql-italic/g, "wd-italic")
    .replace(/ql-underline/g, "wd-underline")
    .replace(/ql-strike/g, "wd-line-through")
    .replace(
      /ql-code-block/g,
      "wd-font-mono wd-bg-gray-100 wd-p-2 wd-rounded"
    )

    // Lists
    .replace(/ql-list-ordered/g, "wd-list-decimal wd-list-inside")
    .replace(/ql-list-bullet/g, "wd-list-disc wd-list-inside")

    // Indentation
    .replace(/ql-indent-1/g, "wd-pl-4")
    .replace(/ql-indent-2/g, "wd-pl-8")
    .replace(/ql-indent-3/g, "wd-pl-12")
    .replace(/ql-indent-4/g, "wd-pl-16")
    .replace(/ql-indent-5/g, "wd-pl-20")
    .replace(/ql-indent-6/g, "wd-pl-24")
    .replace(/ql-indent-7/g, "wd-pl-28")
    .replace(/ql-indent-8/g, "wd-pl-32")
    .replace(/ql-indent-9/g, "wd-pl-36")

    // Text direction
    .replace(/ql-direction-rtl/g, "wd-direction-rtl")

    // Blockquote
    .replace(
      /<blockquote class="ql-quote">/g,
      '<blockquote class="wd-border-l-4 wd-border-gray-300 wd-pl-4 wd-italic wd-my-4">'
    )
    // Video
    .replace(
      /<iframe class="ql-video"/g,
      '<iframe class="wd-w-full wd-aspect-video"'
    )
    // Links
    .replace(
      /<a class="ql-link"/g,
      '<a class="wd-text-system-link wd-underline hover:wd-text-blue-800"'
    )

    // Images
    .replace(
      /<img class="ql-image"/g,
      '<img class="wd-max-w-full wd-h-auto wd-rounded"'
    )

    // Formula (if you're using KaTeX or MathJax)
    .replace(/ql-formula/g, "wd-font-mono wd-bg-gray-100 wd-p-1 wd-rounded")

    // Block elements
    .replace(/<p>/g, '<p class="wd-mb-4">')
    .replace(/<h1>/g, '<h1 class="wd-text-4xl wd-font-bold wd-mb-6">')
    .replace(/<h2>/g, '<h2 class="wd-text-3xl wd-font-bold wd-mb-5">')
    .replace(/<h3>/g, '<h3 class="wd-text-2xl wd-font-semibold wd-mb-4">')
    .replace(/<h4>/g, '<h4 class="wd-text-xl wd-font-semibold wd-mb-3">')
    .replace(/<h5>/g, '<h5 class="wd-text-lg wd-font-semibold wd-mb-2">')
    .replace(/<h6>/g, '<h6 class="wd-text-base wd-font-semibold wd-mb-2">')
    .replace(
      /<ul>/g,
      '<ul class="wd-list-disc wd-list-inside wd-mb-4 wd-pl-5">'
    )
    .replace(
      /<ol>/g,
      '<ol class="wd-list-decimal wd-list-inside wd-mb-4 wd-pl-5">'
    )
    .replace(/<li>/g, '<li class="wd-mb-1">')
    .replace(
      /<blockquote>/g,
      '<blockquote class="wd-border-l-4 wd-border-gray-300 wd-pl-4 wd-italic wd-mb-4">'
    )
    .replace(
      /<pre>/g,
      '<pre class="wd-bg-gray-100 wd-p-4 wd-rounded wd-mb-4 wd-overflow-x-auto">'
    )
    .replace(/<hr>/g, '<hr class="wd-my-8 wd-border-t wd-border-gray-300">')

    // Inline elements
    .replace(
      /<a /g,
      '<a class="wd-text-system-link wd-underline hover:wd-text-blue-800" '
    )
    .replace(/<strong>/g, '<strong class="wd-font-bold">')
    .replace(/<em>/g, '<em class="wd-italic">')
    .replace(/<code>/g, '<code class="wd-bg-gray-100 wd-px-1 wd-rounded">')
    .replace(/<img /g, '<img class="wd-max-w-full wd-h-auto wd-rounded" ')

    // Tables
    .replace(
      /<table>/g,
      '<table class="wd-w-full wd-border-collapse wd-mb-4">'
    )
    .replace(
      /<th>/g,
      '<th class="wd-border wd-border-gray-300 wd-p-2 wd-bg-gray-100">'
    )
    .replace(/<td>/g, '<td class="wd-border wd-border-gray-300 wd-p-2">')

    // Forms
    .replace(
      /<input /g,
      '<input class="wd-border wd-border-gray-300 wd-rounded wd-px-3 wd-py-2" '
    )
    .replace(
      /<textarea>/g,
      '<textarea class="wd-border wd-border-gray-300 wd-rounded wd-px-3 wd-py-2 wd-w-full">'
    )
    .replace(
      /<select>/g,
      '<select class="wd-border wd-border-gray-300 wd-rounded wd-px-3 wd-py-2">'
    )
    .replace(
      /<button>/g,
      '<button class="wd-bg-blue-500 wd-text-white wd-px-4 wd-py-2 wd-rounded hover:wd-bg-system-wd-text-system-link">'
    )
    .replace(/ql-script-sub/g, "wd-align-sub")
    .replace(/ql-script-super/g, "wd-align-super")

    // Checklist
    .replace(/ql-list-check/g, "wd-list-check")

    // Color and Background
    .replace(/ql-color-(\w+)/g, "wd-text-$1")
    .replace(/ql-bg-(\w+)/g, "wd-bg-$1")

    // Font
    .replace(/ql-font-(\w+)/g, "wd-font-$1")

    // Clean (remove formatting)
      .replace(/ql-clean/g, "");
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default QuillViewTailwindCss;
