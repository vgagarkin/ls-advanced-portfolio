import requests from "@/requests";

export const getImagePath = imgPath => {
  const baseUrl = requests.defaults.baseURL;
  return `${baseUrl}/${imgPath}`;
};
