import Iconify from '@/components/atoms/Iconify';
import { isDarkImage } from '@/utils/utils';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ComicTabSection from './ComicTabSection';
const ComicDetailForm = () => {
  const [isDark, setIsDark] = useState(false);
  const backgroundImage = '/assets/layout_dark.png';
  // const backgroundImage = '/assets/layout_light.png';

  useEffect(() => {
    isDarkImage(backgroundImage, setIsDark);
  }, [backgroundImage]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '321px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDark ? 'white' : 'black',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ zIndex: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            ACTION - FANTASY - ADVENTURE
          </Typography>
          {/* Text with shadow effect */}
          <Typography
            variant="h3"
            component="div"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              textShadow: isDark
                ? '2px 2px 4px rgba(0, 0, 0, 0.7)'
                : '2px 2px 4px rgba(255, 255, 255, 0.7)',
            }}
          >
            SOLO LEVELLING
          </Typography>
        </Box>
        {/* Flex container for Icon and Stats, Author Name, and Coming Soon Text */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            right: 0,
            color: isDark ? 'white' : 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          {/* Icon and Stats Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Iconify
                icon="material-symbols:visibility"
                sx={{ fontSize: '24px', color: isDark ? 'white' : 'black' }}
              />
              <Typography>15.256.899</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Iconify
                icon="material-symbols:favorite"
                sx={{ fontSize: '24px', color: isDark ? 'white' : 'black' }}
              />
              <Typography>2.548.348</Typography>
            </Box>
          </Box>
          {/* Author Name */}
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 'bold',
              textShadow: isDark
                ? '2px 2px 4px rgba(0, 0, 0, 0.7)'
                : '2px 2px 4px rgba(255, 255, 255, 0.7)',
            }}
          >
            Hyun-gun, Jang Seong-rak (REDICE STUDIO), Chu-gong
          </Typography>
          {/* Coming Soon Text */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 'bold',
              textShadow: isDark
                ? '2px 2px 4px rgba(0, 0, 0, 0.7)'
                : '2px 2px 4px rgba(255, 255, 255, 0.7)',
            }}
          >
            COMING SOON
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="md">
        <ComicTabSection />
      </Container>
    </>
  );
};

export default ComicDetailForm;
