import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme-context";
import MDEditor from "@uiw/react-md-editor";
interface DescriptionDetailProps {
  description_details?: string;
  feature_enhancement?: string;
}

const DescriptionDetail = ({
  description_details,
  feature_enhancement,
}: DescriptionDetailProps) => {
  return (
    <>
      {!!description_details && (
        <Card
          className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800"
          data-color-mode={useTheme().theme === "dark" ? "dark" : "light"}
        >
          <MDEditor.Markdown
            source={description_details}
            className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800"
          />
        </Card>
      )}
      {!!feature_enhancement && (
        <Card
          className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800"
          data-color-mode={useTheme().theme === "dark" ? "dark" : "light"}
        >
          <MDEditor.Markdown
            source={feature_enhancement}
            className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800"
          />
        </Card>
      )}
    </>
  );
};

export default DescriptionDetail;
