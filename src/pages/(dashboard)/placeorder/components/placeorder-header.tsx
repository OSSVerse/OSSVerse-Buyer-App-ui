import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, H4, Paragraph } from "@/components/ui/typography";

interface PlaceorderHeaderProps {
  type: string;
  title: string;
  description: string;
}
const PlaceorderHeader = ({
  type,
  title,
  description,
}: PlaceorderHeaderProps) => {
  const requestInfo = (
    <div>
      <H4 className="font-bold text-gray-900">
        Didn't find OSS artifact available in the listing?
      </H4>
      <Paragraph className="text-gray-700">
        Place an on-demand request for one or more solutions from the list below.
      </Paragraph>
    </div>

  );

  return (
    <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
      <div className="basis-3/5 flex gap-4 items-center">
        <Badge
          variant={"secondary"}
          className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700"
        >
          {type === "PROJECT" ? (
            <ProjectIcon className="h-8 w-8 text-gray-800 dark:text-gray-200" />
          ) : (
            <MLModelIcon className="h-8 w-8 text-gray-800 dark:text-gray-200" />
          )}
        </Badge>
        <div>
          <H1 className="capitalize text-gray-900">{title}</H1>
          <H4 className="leading-5 text-gray-700">
            {description}
          </H4>
        </div>
      </div>
      <div className="basis-2/5 flex gap-4 items-center justify-end">
        {requestInfo}
        <Button className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700">
          Request
        </Button>
      </div>
    </div>
  );
};

export default PlaceorderHeader;
