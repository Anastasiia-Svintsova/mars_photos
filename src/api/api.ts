import axios from "axios";
import { Photo } from "../types/Photo";
import { Rover } from "../types/Rover";

const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
const key = '5ke2uKJHFonJuUOZd6DVnESefDuiI9KEXPQ3yeNM';

const request = async (url: string) => {
  const response = await axios.get(`${BASE_URL}${url}&api_key=${key}`);

  return response;
};

export const getRovers = async (): Promise<Rover[]> => {
  const response = await axios.get(`${BASE_URL}?api_key=${key}`);

  return response.data.rovers;
};

export const getPhotos = async (name: string, date: string): Promise<Photo[]> => {
  const response = await request(`/${name}/photos?earth_date=${date}&page=1`);

  return response.data.photos;
};

export const getPhotosFromCamera = async (
  name: string, date: string, camera: string
): Promise<Photo[]> => {
  const response = await request(`/${name}/photos?earth_date=${date}&camera=${camera}&page=1`);

  return response.data.photos;
};
