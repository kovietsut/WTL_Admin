import Iconify from '@/components/atoms/Iconify';
import { Button, Card, Radio, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

interface CategoryOption {
  description: string;
  title: string;
  value: string;
}

interface ComicCategoryFormProps {
  onNext: () => void;
  [key: string]: unknown;
}

const categoryOptions: CategoryOption[] = [
  {
    description: 'Engaging long-form stories with detailed narratives and character development.',
    title: 'Novel',
    value: 'novel',
  },
  {
    description:
      'Visual storytelling with rich illustrations, often serialized and quick to consume.',
    title: 'Manga',
    value: 'manga',
  },
];

const ComicCategoryForm: React.FC<ComicCategoryFormProps> = (props) => {
  const { onNext, ...other } = props;
  const [category, setCategory] = useState<string>(categoryOptions[1].value);

  const handleCategoryChange = useCallback((category: string) => {
    setCategory(category);
  }, []);

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">I’m looking for...</Typography>
      </div>
      <Stack spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(category === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleCategoryChange(option.value)}
            variant="outlined"
          >
            <Stack direction="row" spacing={2}>
              <Radio checked={category === option.value} color="primary" />
              <div>
                <Typography variant="subtitle1">{option.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      <div>
        <Button endIcon={<Iconify icon="ep:right" />} onClick={onNext} variant="contained">
          Continue
        </Button>
      </div>
    </Stack>
  );
};

export default ComicCategoryForm;
