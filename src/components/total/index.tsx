import React from "react";
import "./style.css";

type PropsType = {
  totalVolume: number;
  totalQty: number;
};

const Total: React.FC<PropsType> = (props) => {
  return <div className="Table Total">
    <span className="Total__item ">Общий обьем: {props.totalVolume}</span>
    <span className="Total__item ">Общее количество: {props.totalQty}</span>
    <span className="Total__item "><button>Аннулировать</button></span>
  </div>;
};

export default React.memo(Total);
