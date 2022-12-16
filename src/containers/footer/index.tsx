import React, { useCallback, useLayoutEffect, useState, useMemo, MouseEvent, ChangeEvent } from "react";
import Total from "../../components/total";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { actions } from "../../store/article-slice";

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    selected: state.article.selected,
    loading: state.article.loading,
    error: state.article.error,
  }));

  const callbacks = {
    onСancel: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const searchParam = (e.currentTarget.getAttribute('data-key'))
      dispatch(actions.setSort(searchParam))
    }, [dispatch]),
  
  };

  // Подсчет результирующего значения общего количества и обьема выбранных товаров
  const total = useMemo(() => {
      let volume = 0;
      let qty = 0;

      for (let i = 0; i < select.selected.length; i++) {
        volume += select.selected[i].volume 
        qty += select.selected[i].qty 
      }
    
    return { volume, qty }
  }, [select.selected])

  if (select.loading || select.error) return null;

  return <Total totalVolume={total.volume} totalQty={total.qty}/>
};

export default React.memo(Footer);  