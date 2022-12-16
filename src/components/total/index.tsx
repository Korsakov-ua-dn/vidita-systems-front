import React from "react";
import Layout from "../layout";
import "./style.css";

type PropsType = {
  totalVolume: number;
  totalQty: number;
};

const Total: React.FC<PropsType> = (props) => (
  <div className="Total">
    <Layout>
      <div className="Table Total__wrapper">
        <span className="Total__item">Общий обьем: {props.totalVolume}</span>
        <span className="Total__item">Общее количество: {props.totalQty}</span>
        <span className="Total__item"><button>Аннулировать</button></span>
      </div>
    </Layout>
  </div>
);

export default React.memo(Total);
