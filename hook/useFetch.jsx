import useSWR from "swr";
import api from "../service/api";

const useFetch = (url) => {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await api.get(url)

    return response.data
  },{
    revalidateIfStale: false,
  })

  return { data, error, mutate }
}
export default useFetch;