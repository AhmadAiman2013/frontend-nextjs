import BoardsPopover from "./BoardsPopover";
import BoardInputForm from "./BoardInput";

const BoardsCreate = () => {
  return (
    <BoardsPopover
      triggerElement={
        <div className="rounded-lg p-2 h-[100px] flex justify-center items-center bg-gradient-to-r  from-blue-200 to-fuchsia-200 hover:from-blue-400 hover:to-fuchsia-400  text-blue-800 hover:text-blue-900 dark:text-white/90 dark:bg-gradient-to-r dark:from-blue-500/40 dark:to-fuchsia-500/40 dark:hover:text-white dark:hover:from-blue-500 dark:hover:to-fuchsia-500 duration-300 ease-out hover:scale-110">
          Write one!
        </div>
      }
      popoverContent={<BoardInputForm initialValues={{ title: "" }} mode="create" />}
    />
  );
};

export default BoardsCreate;
