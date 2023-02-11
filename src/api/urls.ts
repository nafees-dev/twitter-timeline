import { RequestApiContext } from "../interface/common";

export const GET_TIMELINES: RequestApiContext = { path: "/timeline", method: "get" };
export const LIKE_POST: RequestApiContext = { path: "/like", method: "post" };
export const UNLIKE_POST: RequestApiContext = { path: "/unlike", method: "post" };
