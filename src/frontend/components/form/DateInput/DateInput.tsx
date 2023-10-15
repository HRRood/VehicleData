"use client";

import { FormControl } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { getNestedError } from "../textInput/TextInput";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import nl from "date-fns/locale/nl";

interface DateInputProps {
  name: string;
  label: string;
}

export const DateInput = ({ name, label, ...props }: DateInputProps) => {
  const { register, formState } = useFormContext();
  const error = getNestedError(formState.errors, name);

  return (
    <div style={{ margin: "5px 0" }}>
      <FormControl fullWidth>
        <Controller
          {...register(name)}
          render={({ field: { onChange, ...restField } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
              <DateTimePicker
                label={label}
                onChange={(event) => {
                  onChange(event);
                }}
                {...props}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
        {error && <p>{error.message}</p>}
      </FormControl>
    </div>
  );
};
