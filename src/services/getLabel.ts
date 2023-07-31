import axios, { AxiosResponse } from "axios";

export default async function getLabel(
  labelId: string | null
): Promise<undefined | Label> {
  if (labelId == "0" || !labelId) {
    return undefined;
  }
  const url = `${import.meta.env.VITE_API_URL}/provider/${labelId}`;
  try {
    const configObj: AxiosResponse<undefined | Label> = await axios.get(url);
    console.log(configObj.data)
    return configObj.data;
  } catch (error) {
    console.log("something went wrong with label request");
    return undefined;
  }
}

export type Label = {
  id: string;
  providerId: string;
  darkMode: boolean;
  color: string;
  logo: string;
  language: string;
  name: string;
};
