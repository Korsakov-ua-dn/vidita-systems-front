import React, { useEffect } from "react";
import Layout from "../../components/layout";
import Title from "../../components/title";
import Footer from "../../containers/footer";
import TableContainer from "../../containers/table-container";
import { useAppDispatch } from "../../hooks";
import { fetchAllDocuments } from "../../store/article-slice";

const Main:React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllDocuments())
  }, [dispatch])

  return (
    <Layout>
      <Title title="Таблица"/>
      <TableContainer/>
      {/* <Footer/> */}
    </Layout>
  );
};

export default React.memo(Main);
