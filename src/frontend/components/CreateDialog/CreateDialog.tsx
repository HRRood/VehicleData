"use client";

import { RadixButtonVariants, RadixColors } from "@/app/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface CreateDialogProps {
  DataValidation: any;
  onSubmit: (_data: any, _callback: () => void) => void;
  title: string;
  children: React.ReactNode;
  buttonVariant?: RadixButtonVariants;
  buttonColor?: RadixColors;
  buttonText?: string;
}

export const CreateDialog = ({
  DataValidation,
  onSubmit,
  title,
  children,
  buttonVariant = "soft",
  buttonColor = "amber",
  buttonText = "New",
}: CreateDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(DataValidation),
  });

  const { reset } = form;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color={buttonColor} variant={buttonVariant}>
          {buttonText}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{title}</Dialog.Title>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data, () => {
                reset();
                setOpen(false);
              });
            })}
          >
            {children}

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="surface"
                color="bronze"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="solid" color="crimson">
                Submit
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
};
