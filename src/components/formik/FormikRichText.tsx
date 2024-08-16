import { Field, ErrorMessage } from "formik";
import ReactQuill from "react-quill";

interface FormikRichTextProps {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

const FormikRichText = ({ name, style, className }: FormikRichTextProps) => {
  const modules = {
    toolbar: [
      [
        { header: [1, 2, 3, 4, 5, 6] },
        { font: ["serif", "monospace", "sans-serif"] },
      ],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="wd-flex wd-flex-col wd-gap-2">
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <ReactQuill
            className={className}
            style={style}
            value={field.value}
            modules={modules}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="span"
        className="wd-text-red-600 wd-text-xs wd-mt-1 wd-text-left wd-font-normal wd-ml-4"
      />
    </div>
  );
};


export default FormikRichText;
