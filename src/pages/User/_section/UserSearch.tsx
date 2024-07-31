import Iconify from '@/components/atoms/Iconify';
import { Box, Divider, InputAdornment, OutlinedInput, Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { tabs } from '../User.state';

type Props = {
  onFiltersChange?: (filters: {
    query?: string;
    admin?: string;
    author?: string;
    reader?: string;
    translator?: string;
  }) => void;
};

export const UserSearch = (props: Props) => {
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabsChange = useCallback((event: SyntheticEvent, value: string) => {
    setCurrentTab(value);
  }, []);

  const handleQueryChange = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
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
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search customers"
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="material-symbols:search" width={24} height={24} />
              </InputAdornment>
            }
          />
        </Box>
      </Stack>
    </>
  );
};
