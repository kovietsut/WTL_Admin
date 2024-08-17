import Iconify from '@/components/atoms/Iconify';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import React from 'react';

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

interface ComicCardProps {
  manga: Manga;
}

const ComicCard = ({ manga }: ComicCardProps) => {
  const { coverImage, name, preface, authorName, genres, hasAdult, status, isPublic } = manga;

  return (
    <Card sx={{ maxWidth: 345, position: 'relative', cursor: 'pointer' }} onClick={() => {}}>
      <Box sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={coverImage}
          alt={name}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {preface}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i>{authorName}</i>
        </Typography>
        <Box mt={1}>
          {genres.map((genre, index) => (
            <Chip key={index} label={genre} size="small" sx={{ marginRight: 0.5 }} />
          ))}
        </Box>
      </CardContent>
      {hasAdult && (
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Chip label="Adult" color="error" size="small" />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {status}
        </Typography>
        <IconButton size="small" color="primary">
          {isPublic ? (
            <Iconify icon="material-symbols:public" />
          ) : (
            <Iconify icon="material-symbols:lock" />
          )}
        </IconButton>
      </Box>
    </Card>
  );
};

export default ComicCard;
