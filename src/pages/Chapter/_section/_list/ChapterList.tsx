import Iconify from '@/components/atoms/Iconify';
import { Box, Card, Grid, IconButton, Pagination, Typography } from '@mui/material';
import { useState } from 'react';

interface Chapter {
  number: number;
  title: string;
  views: number;
  image: string;
  publishDate: string; // Added publish date
  status: 'Published' | 'Draft'; // Added status
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Rebirth and Betrayal',
    views: 156899,
    image: '/assets/sample.png',
    publishDate: '2024-08-25',
    status: 'Published',
  },
  {
    number: 2,
    title: 'Into the Abyss',
    views: 120345,
    image: '/assets/sample.png',
    publishDate: '2024-08-27',
    status: 'Draft',
  },
  {
    number: 3,
    title: 'Shadow’s Edge',
    views: 98452,
    image: '/assets/sample.png',
    publishDate: '2024-08-30',
    status: 'Published',
  },
];

const ChapterList = () => {
  const [page, setPage] = useState(1);
  const chaptersPerPage = 3;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleEdit = (chapterNumber: number) => {
    // Handle edit action
  };

  const handleDelete = (chapterNumber: number) => {
    // Handle delete action
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
                {/* Background Image on the left */}
                <Box
                  sx={{
                    width: '80px',
                    height: 'auto',
                    backgroundImage: `url(${chapter.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 0 0 8px',
                    marginRight: 2,
                  }}
                />

                {/* Chapter Information on the right */}
                <Box sx={{ flex: 1, textAlign: 'left', padding: '4px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    Chapter {chapter.number}: {chapter.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify
                      icon="material-symbols:visibility"
                      sx={{ fontSize: '24px', color: 'white' }}
                    />
                    <Typography variant="body2" color="grey.400" sx={{ textAlign: 'left', ml: 1 }}>
                      {chapter.views.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="grey.400" sx={{ textAlign: 'left', mt: 1 }}>
                    Published on: {chapter.publishDate}
                  </Typography>
                  <Typography variant="body2" color="grey.400" sx={{ textAlign: 'left', mt: 1 }}>
                    Status: {chapter.status}
                  </Typography>
                </Box>

                {/* Action buttons */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(chapter.number);
                    }}
                  >
                    <Iconify icon="material-symbols:edit" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(chapter.number);
                    }}
                  >
                    <Iconify icon="material-symbols:delete" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">There are no chapters here</Typography>
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
