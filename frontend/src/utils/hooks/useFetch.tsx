import { useEffect, useRef, useState } from 'react';
import { fetchWrapper } from '../fetchWrapper';

/*Idea is that this hook accept diffrent hepler methods to execute. Also probably we need to 
memoize this hook? I had some problems with to many request with this approach. Maybe you
have some better idea how to handle this instead of passing method? Maybe some switch 
statement here, but problem is when you need to pass helper fn with arguments like recipe_id */

export function useFetch(url: string) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (!url) return;

    // TODO: Remove this timeout! Just simulating a delay to test loading-based features
    setTimeout(() => {
      fetchWrapper
        .get(`${url}`)
        .then((data) => {
          setData(data);
        })
        .catch((error) => setError(error));
    }, 1);
  }, [url]);

  return [data, !error && !data, error];
}

export default useFetch;
