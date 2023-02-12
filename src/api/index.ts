import { RequestApiContext, ResponseContext } from "../interface/common";

export const BASE_URL = "https://dmsglobal.net/ct-api";
export const TOKEN = "Bearer 8U7dPDoiozxF26WNLAdJdo2S9KN7wwg58Dub0v9D";

export const RequestApi = async (context: RequestApiContext): Promise<ResponseContext> => {
  const response: ResponseContext = { data: null, error: "" };
  try {
    const { path, queryParams, params, method, body } = context;
    let apiUrl = `${BASE_URL}${path}`;

    if (params) apiUrl = `${apiUrl}${params}`;
    if (queryParams) apiUrl = `${apiUrl}${queryParams}`;

    // create fetch payload
    const fetchPayload: any = {
      headers: { authorization: TOKEN },
      method,
    };

    // If body is exist then add body in fetch payload
    if (body) fetchPayload.body = body;
    
    const result = await fetch(apiUrl, fetchPayload);
    const parsedResult = await result.json();

    response.data = parsedResult;
    return response;
  } catch (error: any) {
    response.error = error?.data?.message || error?.message;
    return response;
  }
};
