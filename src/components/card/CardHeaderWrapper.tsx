import { CardType } from "@/types/Card";
import CardHeader from "./CardHeader";
import CardOption from "./CardOption";
import CardInput from "./CardInput";

interface CardHeaderWrapperProps {
  card: CardType;
  editing?: boolean;
}

const CardHeaderWrapper = ({
  card,
  editing,
}: CardHeaderWrapperProps) => {
  return (
    <div>
      {editing ? (
        <CardInput
          initialValues={{ title: card.title }}
          mode="update"
          id={card.id}
          boardId={card.boards_id}
        />
      ) : (
        <div className="group flex justify-between">
          <CardHeader title={card.title} />
          <CardOption id={card.id} boardId={card.boards_id} />
        </div>
      )}
    </div>
  );
};

export default CardHeaderWrapper;
