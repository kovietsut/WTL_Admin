import Iconify from '@/components/atoms/Iconify';
import { Box, Card, Grid, Pagination, Typography } from '@mui/material';
import { useState } from 'react';

interface Chapter {
  number: number;
  title: string;
  views: number;
  image: string;
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Rebirth and Betrayal',
    views: 156899,
    image: '/assets/sample.png',
  },
  {
    number: 2,
    title: 'Into the Abyss',
    views: 120345,
    image: '/assets/sample.png',
  },
  {
    number: 3,
    title: 'Shadow’s Edge',
    views: 98452,
    image: '/assets/sample.png',
  },
];

const ChapterList = () => {
  const [page, setPage] = useState(1);
  const chaptersPerPage = 3;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter) => (
            <Grid item key={chapter.number}>
              <Card
                sx={{
                  display: 'flex',
                  backgroundColor: '#1E2A38',
                  color: 'white',
                  borderRadius: '20px',
                  p: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#2A3B4C',
                  },
                }}
                onClick={() => {}}
              >
                {/* Chapter Information on the left */}
                <Box sx={{ flex: 1, textAlign: 'left', padding: '4px' }}>
                  {' '}
                  {/* Ensures the text is left-aligned */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    Chapter {chapter.number}: {chapter.title}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Iconify
                      icon="material-symbols:visibility"
                      sx={{ fontSize: '24px', color: 'white' }}
                    />
                    <Typography variant="body2" color="grey.400" sx={{ textAlign: 'left', ml: 1 }}>
                      {chapter.views.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Background Image on the right */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '80px',
                    height: 'auto',
                    backgroundImage: `url(${chapter.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '0 8px 8px 0',
                  }}
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">There are no chapter here</Typography>
        )}
      </Grid>
      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(chapters.length / chaptersPerPage)} // Total number of pages
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default ChapterList;
