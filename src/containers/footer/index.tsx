import React, { useCallback, useLayoutEffect, useState, useMemo, MouseEvent, ChangeEvent } from "react";
import Total from "../../components/total";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { actions, SortType } from "../../store/article-slice";
import { sortByKey } from "../../utils/sort-by-key";

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    selected: state.article.selected,
    loading: state.article.loading,
    error: state.article.error,
  }));
  // console.log("selected: ", select.selected);

  const callbacks = {
    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const searchParam = (e.currentTarget.getAttribute('data-key'))
      dispatch(actions.setSort(searchParam))
    }, [dispatch]),
  
  };


  return (
    <Total totalVolume={1} totalQty={10}/>
  );
};

export default React.memo(Footer);  