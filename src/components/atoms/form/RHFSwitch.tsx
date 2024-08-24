import { Box, FormControl, FormHelperText, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = { name: string; label?: string };

type Props = IProps;

export default function RHFSwitch({ name, label, ...other }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Box>
              <Switch
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                {...other}
              />
              {label}
            </Box>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
}
