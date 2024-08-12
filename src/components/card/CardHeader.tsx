const CardHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-sm px-2.5 py-1 h-7 font-medium border-transparent truncate">
      {title}
    </div>
  );
};

export default CardHeader;
