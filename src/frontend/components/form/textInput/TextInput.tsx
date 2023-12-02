import { Box, Text, TextField } from "@radix-ui/themes";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
import { styled } from "styled-components";

interface TextInputProps extends React.ComponentProps<typeof TextField.Input> {
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

export const TextInput = ({ name, label, ...props }: TextInputProps) => {
  const { register, formState } = useFormContext();
  const error = getNestedError(formState.errors, name);
  return (
    <Box style={{ margin: "5px 0" }}>
      <TextField.Input {...props} placeholder={label} {...register(name)} variant="surface" size="3" />
      <Text size="1" style={{ color: "red" }}>
        {error?.message}
      </Text>
    </Box>
  );
};
