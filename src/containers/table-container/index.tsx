import React, { useCallback, useState, useMemo, useRef, useEffect, MouseEvent, ChangeEvent } from "react";
import { ArticleType } from "../../api";
import ArticleItem from "../../components/article-item";
import Table from "../../components/table";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { articlesActions } from "../../store/article-slice";
import { sortByKey } from "../../utils/sort-by-key";

const TableContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    articles: state.article.data,
    sort: state.article.sort,
    selected: state.article.selected,
    loading: state.article.loading,
    error: state.article.error,
  }));

  const tableRef = useRef<HTMLUListElement>(null);
  const [search, setSearch] = useState<SearchType>(null);

  const callbacks = {
    onSelect: useCallback((article: ArticleType, isChecked: boolean) => {
      if (isChecked) {
        dispatch(articlesActions.addArticle(article))
      } else {
        dispatch(articlesActions.removeArticle(article))
      }
    }, [dispatch]),

    onSelectAll: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        dispatch(articlesActions.addAll())
      } else {
        dispatch(articlesActions.removeAll())
      }
    }, [dispatch]),

    onSort: useCallback((e: MouseEvent<HTMLSpanElement>) => {
      const searchParam = (e.currentTarget.getAttribute('data-key'))
      dispatch(articlesActions.setSort(searchParam))
    }, [dispatch]),

    onSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const string = e.currentTarget.value
      const field = e.currentTarget.getAttribute('data-field') as OptionsType
      field && setSearch({ string, field })
    }, []),

    clearSearch: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const field = e.currentTarget.getAttribute('data-field') as OptionsType
      if (search?.field !== field) {
        setSearch(null)
      }
    }, [search?.field]),

    onResize: useCallback(() => {
      if (tableRef.current) {
        let maxHeight = window.innerHeight - tableRef.current.offsetTop * 2
        tableRef.current.style.maxHeight = `${maxHeight}px`;
      }
    }, [])
  
  };

  const renders = {
    item: useCallback((item: ArticleType) => (
      <ArticleItem
        key={item._id}
        item={item}
        onSelect={callbacks.onSelect}
        checked={!!select.selected.find(el => el._id === item._id)}
      />
    ), [select.selected, callbacks.onSelect]),
  }

  // Отфильтрованный массив товаров для рендера
  const filteredArticles = useMemo<ArticleType[]>(() => {
    if (search) {
      // Поиск не чувствительный к регистру
      const regex = new RegExp(`${search.string}`, 'i' )
      return select.articles.filter(item => regex.test(String(item[search.field])))
      // Поиск чувствительный к регистру
      // return select.articles.filter(item => String(item[search.field]).includes(search.string))
    } else return select.articles
  }, [search, select.articles])

  // Отсортированный массив товаров для рендера
  const sortArticles = useMemo<ArticleType[]>(() => {
    return sortByKey(filteredArticles, select.sort)
  }, [select.sort, filteredArticles])

  useEffect(() => {
    callbacks.onResize();
    window.addEventListener("resize", callbacks.onResize)
    return () => {
      window.removeEventListener("resize", callbacks.onResize)
    }
  })

  return (
    <>
      { select.loading && "Загрузка информации..." }

      { select.error && select.error }

      { !!select.articles.length && (
        <Table
          items={sortArticles}
          sort={select.sort}
          search={search}
          renderFunc={renders.item}
          onSort={callbacks.onSort}
          onSearch={callbacks.onSearch}
          clearSearch={callbacks.clearSearch}
          onSelectAll={callbacks.onSelectAll}
          ref={tableRef}
        />
      ) }
    </>
  );
};

export default React.memo(TableContainer);

type OptionsType = keyof ArticleType

export type SearchType = { 
  string: string, 
  field: OptionsType
} | null