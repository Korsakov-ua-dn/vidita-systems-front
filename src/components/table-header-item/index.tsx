import React, { MouseEvent } from "react";
import { SortType } from "../../store/article-slice";
import "./style.css";

type PropsType = {
  name: string;
  sort: SortType;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
};

const TableHeaderItem: React.FC<PropsType> = (props) => {
  return (
    <span
      className={`  Article__item
                    Article__item_${props.name}
                    Article__item_header
                    ${props.sort === props.name ? "Article__item_active" : ""}
                  `}
      onClick={props.onSort}
      data-key={props.name}
    >
      {props.name}
    </span>
  );
};

export default React.memo(TableHeaderItem);
