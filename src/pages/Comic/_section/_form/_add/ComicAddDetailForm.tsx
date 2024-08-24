import { RHFTextField } from '@/components/atoms/form';
import RHFSwitch from '@/components/atoms/form/RHFSwitch';
import Iconify from '@/components/atoms/Iconify';
import { listGenreId, languageOptions } from '@/pages/Comic/Comic.state';
import {
  Autocomplete,
  Button,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

interface ComicAddFormProps {
  onBack?: () => void;
  onNext: () => void;
  [key: string]: unknown;
}

const ComicAddDetailForm = ({ onBack, onNext, ...other }: ComicAddFormProps) => {
  const { control } = useFormContext();

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">How would you describe the comic post?</Typography>
      </div>
      <Stack spacing={3}>
        <RHFTextField name="name" fullWidth label="Comic Title" placeholder="Input Title" />
        <RHFTextField
          type="number"
          name="amountOfReadings"
          fullWidth
          label="Amount Of Chapters"
          placeholder="Input Amount Of Chapters"
        />
        <Controller
          name="listGenreId"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <Autocomplete
                  multiple
                  sx={{ minWidth: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Genres" placeholder="Select Genres" />
                  )}
                  renderOption={(props, option) => (
                    <MenuItem {...props} sx={{ height: 30 }}>
                      {option.name || 'Unknown Genre'}
                    </MenuItem>
                  )}
                  onChange={(_, data) => field.onChange(data.map((item) => item.genreId))}
                  value={listGenreId.filter((genre) => field.value?.includes(genre.genreId)) || []}
                  getOptionLabel={(option) => option.name || 'Unknown Genre'}
                  isOptionEqualToValue={(option, value) => option.genreId === value.genreId}
                  options={listGenreId || []}
                />
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </>
            );
          }}
        />
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{ minWidth: 300 }}
              renderInput={(params) => <TextField {...params} placeholder="Select a Language" />}
              renderOption={(props, option) => (
                <MenuItem {...props} sx={{ height: 30 }}>
                  {option.name || 'Unknown Language'}
                </MenuItem>
              )}
              onChange={(_, data) => field.onChange(data?.language)}
              value={languageOptions.find((option) => option.language === field.value) || null}
              getOptionLabel={(option) => option.name || 'Unknown Language'}
              isOptionEqualToValue={(option, value) => option.language === value.language}
              options={languageOptions}
            />
          )}
        />
        <RHFSwitch name="hasAdult" label="Sexual Content" />
        <RHFTextField
          multiline
          name="preface"
          fullWidth
          label="Summary"
          placeholder="Input Summary"
        />
      </Stack>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Button endIcon={<Iconify icon="ep:right" />} onClick={onNext} variant="contained">
          Create Manga
        </Button>
        <Button color="inherit" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

export default ComicAddDetailForm;
