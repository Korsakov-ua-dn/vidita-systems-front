import React, { useCallback, ChangeEvent } from "react";
import { ArticleType } from "../../api";
import numberFormat from "../../utils/number-format";
import "./style.css";

type PropsType = {
  item: ArticleType;
  checked: boolean;
  onSelect: (item: ArticleType, isChecked: boolean) => void;
};

const ArticleItem: React.FC<PropsType> = (props) => {
  const onSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      props.onSelect(props.item, e.target.checked),
    [props]
  );

  return (
    <li className="Table__item Article">
      <span className="Article__item Article__item_checkbox">
        <input
          type="checkbox"
          id={props.item._id}
          onChange={onSelect}
          checked={props.checked}
        />
      </span>
      <span className="Article__item Article__item_name">
        {props.item.name}
      </span>
      <span className="Article__item Article__item_status">
        {props.item.status}
      </span>
      <span className="Article__item Article__item_sum">{props.item.sum}</span>
      <span className="Article__item Article__item_qty">{props.item.qty}</span>
      <span className="Article__item Article__item_volume">
        {props.item.volume}
      </span>
      <span className="Article__item Article__item_delivery_date">
        {props.item.delivery_date}
      </span>
      <span className="Article__item Article__item_currency">
        {props.item.currency}
      </span>
      <span className="Article__item Article__item_total">
        {
          numberFormat(props.item.sum * props.item.qty) +
          " " +
          props.item.currency
        }
      </span>
    </li>
  );
};

export default React.memo(ArticleItem);
