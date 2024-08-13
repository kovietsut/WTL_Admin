import Iconify from '@/components/atoms/Iconify';
import { Divider, InputAdornment, OutlinedInput, Stack, Tab, Tabs } from '@mui/material';
import { useRef } from 'react';
import { tabs, useUserStore } from '../../User.state';

type Props = {
  onChangeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UserSearch = ({ onChangeKeyword }: Props) => {
  const queryRef = useRef(null);
  const { currentTab, setCurrentTab } = useUserStore();

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={setCurrentTab}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={3} sx={{ p: 3 }}>
        <OutlinedInput
          onChange={onChangeKeyword}
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder="Search users"
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
