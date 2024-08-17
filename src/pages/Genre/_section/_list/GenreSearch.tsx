import Iconify from '@/components/atoms/Iconify';
import { Divider, InputAdornment, OutlinedInput, Stack, Tab, Tabs } from '@mui/material';
import { useRef } from 'react';
import { useGenreStore } from '../../Genre.state';

type Props = {
  onChangeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const GenreSearch = ({ onChangeKeyword }: Props) => {
  const queryRef = useRef(null);

  return (
    <>
      <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={3} sx={{ p: 3 }}>
        <OutlinedInput
          onChange={onChangeKeyword}
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder="Search genres"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="material-symbols:search" width={24} height={24} />
            </InputAdornment>
          }
        />
      </Stack>
    </>
  );
};
