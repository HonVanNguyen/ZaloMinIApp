import { useQuery } from "react-query";
import { QUERY_KEYS } from "common/constants/queryKeys.constant";
import { getBlogsBySubject } from "../services";
import { I_SubjectsData } from "pages/index/common/interFace";

export const useGetListBlogsBySub = (id: string) => {
  return useQuery<I_SubjectsData, Error>(
    [QUERY_KEYS.BLOGS, id], // Cache key for the query
    () => getBlogsBySubject(id), // Use a callback to fetch the data
    {
      cacheTime: 0, // Ensures fresh data on each query
      staleTime: 60000, // Data becomes stale after 60 seconds
      retry: 1, // Retries once on failure
      onError: (error: Error) => {
        console.error("Error fetching blogs:", error.message); // Handle errors
      },
    }
  );
};
