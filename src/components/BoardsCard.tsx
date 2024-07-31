import { MoveUpRight } from "lucide-react";

const BoardsCard = ( {title} : {title: string} ) => {
  return (
    <div className="group relative bg-background w-full max-w-[150px] h-[100px] rounded-lg border border-blue-900 dark:border-blue-primary p-2 shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40 overflow-hidden transition-all duration-300 ease-out hover:scale-110 hover:text-white hover:bg-blue-primary">
      <p>{title}</p>
      <MoveUpRight className="absolute bottom-0 right-0 mr-2 mb-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" size={20} />
    </div>
  );
};

export default BoardsCard;
