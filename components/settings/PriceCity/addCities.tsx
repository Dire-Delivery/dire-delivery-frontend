import { Button } from '@/components/ui/button';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { cityaddFormSchema } from '@/types/cities';
import { addCity } from '@/actions/cities';
import { toast } from '@/hooks/use-toast';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const AddCities = ({ setActiveTab, setTriggerState, userId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof cityaddFormSchema>>({
    resolver: zodResolver(cityaddFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof cityaddFormSchema>> = async (
    data
  ) => {
    const cityData = {
      ...data,
    };
    try {
      await addCity({ data: cityData, userid: userId });
      setActiveTab('price');
      setTriggerState((prev) => !prev);
      toast({
        title: 'added successfully',
        description: 'City added successfully',
        variant: 'success',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error adding City',
        description: 'Error while adding order',
        variant: 'destructive',
      });
      console.log(error);
    }
  };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Add Cities</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div>
            <label className="block mb-2 font-medium">City Name</label>
            <input
              type="text"
              className="input-field border rounded-md w-full p-2"
              {...register('name')}
              placeholder="(ex. Dire Dawa)"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">City Code</label>
            <input
              type="text"
              className="input-field border rounded-md w-full p-2"
              {...register('code')}
              placeholder="(ex. ETDD)"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              className="primary-button bg-[#0a1172] p-2 rounded-sm px-4 text-white"
            >
              Add city
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCities;
