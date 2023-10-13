"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateDialogProps {
  DataValidation: any;
  onSubmit: (_data: any, _callback: () => void) => void;
  title: string;
  children: React.ReactNode;
  buttonVariant?: "text" | "outlined" | "contained" | undefined;
  buttonColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
  buttonText?: string;
}

export const CreateDialog = ({
  DataValidation,
  onSubmit,
  title,
  children,
  buttonVariant = "outlined",
  buttonColor = "primary",
  buttonText = "New",
}: CreateDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(DataValidation),
  });

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant={buttonVariant} color={buttonColor} type="button" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Dialog open={open} TransitionComponent={Transition} maxWidth="md" fullWidth onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data, () => {
                handleClose();
              });
            })}
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
};
