import React, { useCallback, useMemo, MouseEvent } from "react";
import Total from "../../components/total";
import { POPUPS } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { articlesActions, fetchCancel } from "../../store/article-slice";
import { popupsActions } from "../../store/popups-slice";

const Footer:React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    selected: state.article.selected,
    loading: state.article.loading,
    error: state.article.error,
  }));

  const callbacks = {
    onСancel: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const searchParam = (e.currentTarget.getAttribute('data-key'))
      dispatch(articlesActions.setSort(searchParam))
    }, [dispatch]),

    openDialog: useCallback(() => {
      const dialogTitle = "Вы уверены что хотите аннулировать товар(ы): "
      const dialogContentText = select.selected.reduce(
        (acc, cur, i) => acc + (i === select.selected.length - 1 ? `${cur.name}.` : `${cur.name}, `)
      , '')
      // Создаем объект модального окна
      const popupObj = {
        name: POPUPS.AlertPopup, 
        dialogTitle,
        dialogContentText,
        onClose: (isAgree: boolean) => {
          dispatch(popupsActions.close(popupObj))
          isAgree && dispatch(fetchCancel())
        },
      }
      dispatch(popupsActions.open(popupObj))
    }, [dispatch, select.selected]),
  
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

  return <Total 
            totalVolume={total.volume} 
            totalQty={total.qty} 
            openDialog={callbacks.openDialog}
          />
};

export default React.memo(Footer);  