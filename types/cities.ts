export type city = {
  name: string;
  code: string;
};

import { z } from 'zod';

export const cityaddFormSchema = z.object({
  name: z.string().min(1, 'City Name is required'),
  code: z
    .string()
    .min(4, 'City Code is requried and Must Be 4 Characters Ex: ETXX'),
});
// export type addFormSchema = z.infer<typeof formSchema>;

export type PriceInfoType = {
  id: number;
  price: number;
  supportTel: string;
};

export type Location = {
  name: string;
  code: string;
};

export type constants = {
  price: PriceInfoType;
  locations: Location[];
};
