import Iconify from '@/components/atoms/Iconify';
import { categoryOptions } from '@/pages/Comic/Comic.state';
import { Button, Card, Radio, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ComicCategoryFormProps {
  onNext: () => void;
  [key: string]: unknown;
}

const ComicCategoryForm = ({ onNext, ...other }: ComicCategoryFormProps) => {
  const { setValue } = useFormContext();
  const [category, setCategory] = useState<string>(categoryOptions[0].value);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setCategory(category);
      setValue('type', category);
    },
    [setValue]
  );

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
