import { POKEAPI_URL } from "@/utils/constants";
import axios from "axios";

export const pokeapi = axios.create({
  baseURL: POKEAPI_URL,
});
