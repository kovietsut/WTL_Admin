import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type IProps = {
  name: string;
  children: JSX.Element | JSX.Element[];
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({ name, children, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
