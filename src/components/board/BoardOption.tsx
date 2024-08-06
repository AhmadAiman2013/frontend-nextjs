import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

const BoardOption = () => {
  return (
    <Button size="supericon" variant="ghost" className="opacity-5 group-hover:opacity-100 ">
      <EllipsisVertical size={20} />
    </Button>
  );
};

export default BoardOption;
