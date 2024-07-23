export const encodeJWT = (data: any) => {
  return encodeURIComponent(JSON.stringify(data));
};
export const decodeJWT = (data: any) => {
  return JSON.parse(decodeURIComponent(data));
};
