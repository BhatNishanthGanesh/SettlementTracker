export const GET = (handler: (request: Request) => Promise<Response>) => {
    return async (request: Request): Promise<Response> => {
      if (request.method === 'GET') {
        return await handler(request);
      } else {
        return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
      }
    };
  };