// utils/fetchWrapper.ts

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  async function fetchWrapper(url: string, options: FetchOptions = {}, req: any = null): Promise<Response> {
    const headers: Record<string, string> = options.headers || {};
    
    if (req) {
      headers['cookie'] = req.headers.cookie || '';
    }
  
    const updatedOptions: FetchOptions = {
      ...options,
      headers,
    };
  
    return await fetch(url, updatedOptions);
  }
  
  export default fetchWrapper;
  