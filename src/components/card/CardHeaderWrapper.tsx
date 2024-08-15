import { CardType } from "@/types/Card"
import CardHeader from "./CardHeader"
import CardOption from "./CardOption"

const CardHeaderWrapper = ({card} : {card : CardType}) => {
  return (
    <div className="group flex justify-between">
        <CardHeader title={card.title} />
        <CardOption id={card.id} boardId={card.boards_id} />
    </div>
  )
}

export default CardHeaderWrapper