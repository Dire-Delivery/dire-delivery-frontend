import apiCall from '@/base-api/api';
import { help } from '@/types/help';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const HelpFetch = async () => {
  const fetchURl = `${BaseURL}/constants`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const patchHelp = async ({
  data,
  userid,
  constants,
}: {
  data: help;
  userid: string;
  constants: number;
}) => {
  const fetchURl = `${BaseURL}/constants/${userid}/update-constants/${constants}`;
  console.log('patchURL:', fetchURl);

  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response;
};
