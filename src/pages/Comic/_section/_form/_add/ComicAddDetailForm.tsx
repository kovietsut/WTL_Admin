import Iconify from '@/components/atoms/Iconify';
import { Button, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

interface ComicAddFormProps {
  onBack?: () => void;
  onNext: () => void;
  [key: string]: unknown;
}

const ComicAddDetailForm: React.FC<ComicAddFormProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTagAdd = useCallback((tag: string) => {
    setTags((prevState) => {
      return [...prevState, tag];
    });
  }, []);

  const handleTagDelete = useCallback((tag: string) => {
    setTags((prevState) => {
      return prevState.filter((t) => t !== tag);
    });
  }, []);

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">How would you describe the manga post?</Typography>
      </div>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Comic Title"
          name="comicTitle"
          placeholder="e.g Salesforce Analyst"
        />
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="inherit"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    if (!tag) {
                      return;
                    }

                    handleTagAdd(tag);
                    setTag('');
                  }}
                >
                  Add
                </Button>
              </InputAdornment>
            ),
          }}
          label="Tags"
          name="tags"
          onChange={(event) => setTag(event.target.value)}
          value={tag}
        />
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Button endIcon={<Iconify icon="ep:right" />} onClick={onNext} variant="contained">
          Create Manga
        </Button>
        <Button color="inherit" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

export default ComicAddDetailForm;
