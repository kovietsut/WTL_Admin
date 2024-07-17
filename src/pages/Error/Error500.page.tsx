import { Box, Typography, Button, Stack, Tooltip, Grid } from '@mui/material';
import useStyle from './Error.styles';
import { Icon500 } from './images/Icon500';

const Error500Page = (): JSX.Element => {
  const styles = useStyle();
  return (
    <Box sx={styles.errorContainer}>
      <Box>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Icon500 />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Typography variant="h2" sx={styles.errorTitle}>
          500 - Internal Server Error
        </Typography>
        <Typography sx={styles.errorParagraph}>
          An unexpected error occurred. Please try again later.
        </Typography>
        <Typography>
          <Button href="/" sx={styles.errorButton}>
            Go To Homepage
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Error500Page;
