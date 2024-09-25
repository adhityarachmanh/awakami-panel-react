import { Field, ErrorMessage } from "formik";
import ReactQuill from "react-quill";
import { Typography } from "@mui/material";

interface FormikRichTextProps {
  name: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const FormikRichText = ({ name, disabled = false }: FormikRichTextProps) => {
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
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <div style={{ height: "750px", width: "100%" }}>
          <ReactQuill
            value={field.value}
            readOnly={disabled}
            modules={modules}
            style={{ height: "700px", width: "100%" }}
            scrollingContainer={"#root"}
       
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
          <ErrorMessage
            name={name}
            component="span"
            render={(msg) => (
              <Typography variant="body2" color="error" style={{ marginTop: "4px", marginLeft: "16px", textAlign: "left", fontWeight: "normal" }}>
                {msg}
              </Typography>
            )}
          />
        </div>
      )}
    </Field>
  );
};

export default FormikRichText;
