import { Autocomplete, Box, Card, Divider, Grid, TextField, Typography } from '@mui/material';
import { ProfileData } from '../Profile.state';
import { useState } from 'react';
import useStyle from '../Profile.style';
const options = ['Male', 'Female'];

export interface UpdateFormProps {
  isSubmitting: boolean;
}

const UpdateForm = (props: UpdateFormProps): JSX.Element => {
  const styles = useStyle();
  const { isSubmitting } = props;
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: string | null) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: '#2a2a3e',
          padding: '30px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h5">Edit profile</Typography>
        <br />
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                defaultValue={ProfileData.email}
                fullWidth
                variant="outlined"
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Full Name:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={isSubmitting}
                defaultValue={ProfileData.fullname}
                fullWidth
                variant="outlined"
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Phone:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={isSubmitting}
                defaultValue={ProfileData.phone}
                fullWidth
                variant="outlined"
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Address:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={isSubmitting}
                defaultValue={ProfileData.address}
                fullWidth
                variant="outlined"
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Gender:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disabled={isSubmitting}
                value={value}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                id="controllable-states-demo"
                options={options}
                clearIcon=""
                sx={styles.textField}
                renderInput={(params) => (
                  <TextField sx={{ width: '100%' }} {...params} label="Gender" />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default UpdateForm;
