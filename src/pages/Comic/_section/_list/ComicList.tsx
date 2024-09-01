import React, { useState, useEffect } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import ComicCard from './ComicCard';
import { mangaData } from '../../Comic.state';

export type Manga = {
  id: number;
  coverImage: string;
  name: string;
  preface: string;
  authorName: string;
  genres: string[];
  hasAdult: boolean;
  status: string;
  isPublic: boolean;
};

const ComicList = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [paginatedData, setPaginatedData] = useState<Manga[]>([]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(mangaData.slice(startIndex, endIndex));
  }, [page, itemsPerPage]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {paginatedData.map((manga) => (
          <Grid item xs={12} sm={6} md={6} key={manga.id}>
            <ComicCard manga={manga} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(mangaData.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ComicList;
