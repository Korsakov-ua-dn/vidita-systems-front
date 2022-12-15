import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API_URL}`,
});

export const articleApi = {
  getAll(document: string) {
    return instance.get(`/api/${document}`);
  },
};

// types
export type ArticleType = {
  _id: string,
  status: "active" | "archive"
  sum: number,
  qty: number,
  volume: number,
  name: string,
  delivery_date: string,
  currency: string
};