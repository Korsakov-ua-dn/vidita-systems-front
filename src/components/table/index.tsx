import React, { useMemo, MouseEvent, ChangeEvent, ForwardedRef } from "react";
import { ArticleType } from "../../api";
import { SearchType } from "../../containers/table-container";
import { SortType } from "../../store/article-slice";
import TableHeaderItem from "../table-header-item";
import TableHeaderSearch from "../table-header-search";
import "./style.css";

type PropsType = {
  items: ArticleType[];
  sort: SortType;
  search: SearchType;
  renderFunc: (item: ArticleType) => React.ReactNode;
  onSort: (e: MouseEvent<HTMLSpanElement>) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Table = React.forwardRef((props: PropsType, ref: ForwardedRef<HTMLUListElement | null>) => {
  const options = {
    headerColumn: useMemo(
      () => [
        "name",
        "status",
        "sum",
        "qty",
        "volume",
        "delivery_date",
        "currency",
      ],
      []
    ),
  };

  return (
    <ul className={"Table"} ref={ref}>
      <li className="Table__item Article">
        <span className="Article__item Article__item_checkbox">
          <input type="checkbox" id="header" onChange={props.onSelectAll}/>
        </span>
        
        {options.headerColumn.map(col => (
          <TableHeaderItem
            key={col}
            name={col}
            sort={props.sort}
            onSort={props.onSort}
          />
        ))}

        <span className="Article__item Article__item_header Article__item_total">
          total
        </span>
      </li>

      <li className="Table__item Article">
        <span className="Article__item"></span>
        
        {options.headerColumn.map(col => (
          <TableHeaderSearch
            key={"search" + col}
            name={col}
            search={props.search}
            onSearch={props.onSearch}
            clearSearch={props.clearSearch}
          />
        ))}

        <span className="Article__item"></span>
      </li>

      {props.items.map((item) => props.renderFunc(item))}
    </ul>
  );
});

export default React.memo(Table);
