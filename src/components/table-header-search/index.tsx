import React, { ChangeEvent } from "react";
import { SearchType } from "../../containers/table-container";
import "./style.css";

type PropsType = {
  name: string;
  search: SearchType;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TableHeaderSearch: React.FC<PropsType> = (props) => {
  return (
      <input
        className="Table__search"
        data-field={props.name}
        value={props.search?.field === props.name ? props.search.string : ""}
        onChange={props.onSearch}
        placeholder="search"
        onFocus={props.clearSearch}
      />
  );
};

export default React.memo(TableHeaderSearch);
