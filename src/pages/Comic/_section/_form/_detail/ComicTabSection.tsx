import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import InformationSection from './InformationSection';

const ComicTabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        sx={{
          mt: 4,
          backgroundColor: '#111927',
          borderRadius: '10px',
          overflow: 'hidden',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            flex: 1,
          },
          '& .MuiTab-root.Mui-selected': {
            color: '#111927',
            backgroundColor: 'white',
            borderRadius: '20px',
          },
          '& .MuiTab-root:not(.Mui-selected)': {
            color: 'white',
            backgroundColor: '#111927',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
            },
          },
        }}
      >
        <Tab label="Information" />
        <Tab label="Comments" />
      </Tabs>
      {value === 0 && <InformationSection />}
      {value === 1 && <Box>Comments Content</Box>}
    </Box>
  );
};

export default ComicTabSection;
