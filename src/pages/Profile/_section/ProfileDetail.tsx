import { Box, Card, Divider, Grid, TextField, Typography } from '@mui/material';
import { ProfileData } from '../Profile.state';
import useStyle from '../Profile.style';

const ProfileDetail = (): JSX.Element => {
  const styles = useStyle();
  return (
    <>
      <Card
        sx={{
          backgroundColor: '#2a2a3e',
          padding: '30px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h5">Profile Details</Typography>
        <br />
        <Box sx={{ width: '100%', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="h6" align="left">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={styles.typography} variant="body1" align="left">
                {ProfileData.email}
              </Typography>
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
              <Typography sx={styles.typography} variant="body1" align="left">
                {ProfileData.fullname}
              </Typography>
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
              <Typography sx={styles.typography} variant="body1" align="left">
                {ProfileData.phone}
              </Typography>
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
              <Typography sx={styles.typography} variant="body1" align="left">
                {ProfileData.address}
              </Typography>
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
              <Typography sx={styles.typography} variant="body1" align="left">
                {ProfileData.gender}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default ProfileDetail;
