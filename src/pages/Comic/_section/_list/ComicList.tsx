import React, { useState, useEffect } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import ComicCard from './ComicCard';

interface Manga {
  id: number;
  coverImage: string;
  name: string;
  preface: string;
  authorName: string;
  genres: string[];
  hasAdult: boolean;
  status: string;
  isPublic: boolean;
}

const mangaData: Manga[] = [
  {
    id: 1,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 1',
    preface: 'This is a short description of Manga 1.',
    authorName: 'Author 1',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 2,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 2',
    preface: 'This is a short description of Manga 2.',
    authorName: 'Author 2',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 3,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 3',
    preface: 'This is a short description of Manga 3.',
    authorName: 'Author 3',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 4,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 4',
    preface: 'This is a short description of Manga 4.',
    authorName: 'Author 4',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 5,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 5',
    preface: 'This is a short description of Manga 5.',
    authorName: 'Author 5',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 6,
    coverImage:
      'https://cdn.discordapp.com/attachments/1235050448998633534/1274297480707838035/image_431.png?ex=66c1bd82&is=66c06c02&hm=954ab21c803072f2bfc247d2217c92f2a211ae45e02a537d5b0fdd9c17e35503&',
    name: 'Manga 6',
    preface: 'This is a short description of Manga 6.',
    authorName: 'Author 6',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
];

const ComicList = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
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
          <Grid item xs={12} sm={6} md={4} key={manga.id}>
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
