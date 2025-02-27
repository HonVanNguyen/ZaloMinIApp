import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'common/constants/queryKeys.constant';
import { getBanner } from '../services';
import { IHomeConfig } from '../interFace';

export const useGetListHomeConfig = () => {
    return useQuery<IHomeConfig, Error>(
        [QUERY_KEYS.BANNER_HOME], // Cache key for the query
        getBanner, // The function that fetches the data
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
