import Iconify from '@/components/atoms/Iconify';
import { PATH } from '@/libs/helpers/routes';
import { Box, Button, Card, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { id, coverImage, name, preface, authorName, genres, hasAdult, status, isPublic } = manga;

  const handleCardClick = () => {
    navigate(`${PATH.comics.detail.replace(':id', id.toString())}`);
  };

  const handleEditComic = () => {
    navigate(`${PATH.comics.edit.replace(':id', id.toString())}`);
  };

  const handleDeleteComic = () => {
    console.log('Delete comic with ID:', id);
  };

  const handleAddEpisode = () => {
    navigate(`${PATH.comics.new.replace(':id', id.toString())}`);
  };

  const handleEditEpisode = () => {
    navigate(`${PATH.comics.new.replace(':id', id.toString())}`);
  };

  return (
    <Card
      sx={{ display: 'flex', cursor: 'pointer', position: 'relative' }}
      onClick={handleCardClick}
    >
      <Box sx={{ width: '30%' }}>
        <CardMedia
          component="img"
          sx={{ height: '100%', objectFit: 'cover' }}
          image={coverImage}
          alt={name}
        />
      </Box>
      <Box
        sx={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {preface}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <i>{authorName}</i>
          </Typography>
          <Box mt={1}>
            {genres.map((genre, index) => (
              <Chip key={index} label={genre} size="small" sx={{ marginRight: 0.5 }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {hasAdult && <Chip label="Adult" color="error" size="small" sx={{ mr: 1 }} />}
            <Typography variant="caption" color="text.secondary">
              {status}
            </Typography>
          </Box>
          <IconButton size="small" color="primary">
            {isPublic ? (
              <Iconify icon="material-symbols:public" />
            ) : (
              <Iconify icon="material-symbols:lock" />
            )}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleAddEpisode();
            }}
          >
            Add Episode
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEditEpisode();
            }}
          >
            Edit Episode
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleEditComic();
          }}
        >
          <Iconify icon="material-symbols:edit" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteComic();
          }}
        >
          <Iconify icon="material-symbols:delete" />
        </IconButton>
      </Box>
    </Card>
  );
};
export default ComicCard;
