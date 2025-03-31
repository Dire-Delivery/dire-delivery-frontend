import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { changePrice } from '@/actions/price';
import { PriceInfoType } from '@/types/cities';
import { toast } from '@/hooks/use-toast';

type Props = {
  setNewPrice: React.Dispatch<React.SetStateAction<number>>;
  confirmModal: boolean;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  newPrice: number;
  userId: string;
  constatns: PriceInfoType;
  setEditPrice: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditPrice({
  setNewPrice,
  confirmModal,
  setConfirmModal,
  newPrice,
  userId,
  constatns,
  setEditPrice,
  setTriggerState,
}: Props) {
  const handlePriceChange = async () => {
    const newPriceSet = {
      price: newPrice,
    };
    try {
      await changePrice({
        data: newPriceSet,
        userid: userId,
        constants: constatns!.id,
      });
      toast({
        title: 'Successfull',
        description: `Price Set succesfull `,
        variant: `success`,
      });
      setConfirmModal(false);
      setEditPrice(false);
      setTriggerState((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: `Error on Price Set `,
        variant: `destructive`,
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-start items-start gap-3 border">
        <div className="w-full py-2 border-b border-black inline-flex justify-start items-center gap-2.5">
          <div className="w-full justify-start text-black text-lg font-bold font-['Manrope'] leading-tight">
            Edit Price
          </div>
        </div>
        <div className="w-full  flex flex-col justify-center items-end gap-2.5">
          <div className="w-full h-5 justify-start text-muted-foreground text-sm font-normal font-['Manrope'] leading-tight">
            Set a Price for Orders based on Weight
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="inline-flex flex-col justify-start items-start gap-1.5 w-full ">
              <div className="justify-start text-foreground text-base font-medium font-['Manrope'] leading-tight">
                Base Price (birr)
              </div>
              <div className="w-full h-10 inline-flex justify-start items-center gap-2">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                  <input
                    title="base"
                    type="number"
                    className=" px-2 py-2.5 rounded-md outline outline-1 outline-input justify-start text-zinc-500 text-base font-normal font-['Manrope'] leading-tight w-full h-full"
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <AlertDialog open={confirmModal} onOpenChange={setConfirmModal}>
            <AlertDialogTrigger asChild>
              <Button
                className="h-10 px-3 bg-violet-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-950 inline-flex justify-center items-center gap-2.5 text-base"
                onClick={() => setConfirmModal(true)}
              >
                Confirm
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently Change the
                  Price
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmModal(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    // Add your action here
                    handlePriceChange();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default EditPrice;
