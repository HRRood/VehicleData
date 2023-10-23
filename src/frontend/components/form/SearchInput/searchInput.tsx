import { useLocations } from "@/frontend/hooks/useLocations";
import { Autocomplete, BaseTextFieldProps, FormControl, TextField } from "@mui/material";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
import { styled } from "styled-components";
import Loader from "../../global/Loader/loader";

interface SearchInputProps extends BaseTextFieldProps {
  name: string;
  label: string;
}

export const SmallError = styled.small`
  color: red;
`;

export const getNestedError = (errors: FieldErrors, name: string): FieldError => {
  const properties = name.split(".");
  let error: FieldError | FieldErrors = errors;

  for (const property of properties) {
    // @ts-ignore
    error = error?.[property];
  }

  return error as FieldError;
};

export const SearchInput = ({ name, label }: SearchInputProps) => {
  const { data, isLoading } = useLocations();
  const { setValue } = useFormContext();

  if (isLoading) return <Loader isLoading />;

  const options = data || [];
  return (
    <div style={{ margin: "5px 0" }}>
      <FormControl fullWidth>
        <Autocomplete
          freeSolo
          fullWidth
          // defaultValue={selectedValue}
          onChange={(_: any, newValue) => {
            setValue(name, newValue);
          }}
          options={options}
          renderInput={(params) => {
            return <TextField label={label} name={name} {...params} />;
          }}
        />
      </FormControl>
    </div>
  );
};
