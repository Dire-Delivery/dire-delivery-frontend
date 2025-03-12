import apiCall from '@/base-api/api';
import { endPoints } from '@/data/endPoints';
import { help } from '@/types/help';

const BaseURL = 'http://localhost:3001';
const url = `${BaseURL}/${endPoints.help}`;

export const HelpFetch = async () => {
  const response = await apiCall({ url: url });
  return response;
};

export const patchHelp = async (data: help) => {
  const response = await apiCall({ url: url, method: 'PATCH', data: data });
  return response;
};
