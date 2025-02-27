import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'common/constants/queryKeys.constant';
import { getFormDynamic } from '../services';
import { IHomeConfig } from '../interFace';

export const useGetListFormData = () => {
    return useQuery<any, Error>(
        [QUERY_KEYS.DATA_DYNAMIC_FORM], // Cache key for the query
        getFormDynamic, // The function that fetches the data
        {
          cacheTime: 0, // Sets the cache time to 0 to ensure fresh data on each query
          staleTime: 60000, // Optional: Sets the time after which data becomes stale
          retry: 1, // Optional: Number of retries on failure
          onError: (error: Error) => {
            // Optionally handle errors
            console.error("Error fetching banner:", error.message);
          },
        }
      );
};
