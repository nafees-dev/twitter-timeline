export interface RequestApiContext {
  path: string | undefined;
  method: "post" | "get" | "delete" | "update";
  body?: any;
  headers?: any;
  queryParams?: string;
  params?: string;
}

export interface ResponseContext {
  data: any;
  error: string;
}
