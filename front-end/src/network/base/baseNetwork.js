import { axiosInstance } from "../axiosInstance/axiosInstance";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./query_keys";

export const baseNetwork = {
  getAll: async (url) => {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery("products", () =>
      axios
        .get("")
        .then((res) => res.data)
    );
  },

  getById: () => {},

  add: (url, data) => {
    return axiosInstance.post(url, JSON.stringify(data));
  },

  update: () => {},

  delete: (url) => {
    return axiosInstance.delete(url);
  },
};
