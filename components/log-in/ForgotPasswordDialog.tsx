'use client';


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

type ForgotPasswordDialogProps = {
    forgotPasswordForm: UseFormReturn<{ email: string}>, 
    showAlertDialog: boolean,
    setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>,
    handleForgotPassword: (email: string) => void;
}


function ForgotPasswordDialog({showAlertDialog, setShowAlertDialog, forgotPasswordForm, handleForgotPassword}: ForgotPasswordDialogProps) {
  return (
    <AlertDialog
        open={showAlertDialog}
        onOpenChange={(open) => setShowAlertDialog(open)} // ✅ Simplified
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#060A87] text-xl">
              Confirm Password Reset
            </AlertDialogTitle>
            <AlertDialogDescription>
              If you proceed, please provide your registered email address
              below. An email with a password reset link will be sent to your
              inbox.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit((data) =>
                handleForgotPassword(data.email)
              )}
              className="space-y-4 md:space-y-7"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s font-medium text-[#060A87] md:text-lg">
                      Email <span className="text-[#E03137]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@mail.com"
                        className="h-10 md:h-12 md:text-base focus:outline-none focus:border-none focus-visible:ring-[#060A87]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type="submit" // ✅ Submit the form
                  className="bg-[#060A87] hover:bg-[#060a87dc]"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default ForgotPasswordDialog