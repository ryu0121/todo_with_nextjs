import useSWR from "swr";
import axios from 'axios';


const useTodo = (path: string) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error } = useSWR(`${host}/${path}`, fetcher);

  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useTodo;