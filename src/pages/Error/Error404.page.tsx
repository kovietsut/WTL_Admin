import { Box, Typography, Button, Stack, Tooltip, Grid } from '@mui/material';
import useStyle from './Error.styles';
import { Icon404 } from './images/Icon404';

const Error404Page = (): JSX.Element => {
  const styles = useStyle();
  return (
    <Box sx={styles.errorContainer}>
      <Box>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box  display="flex" alignItems="center">
              <Icon404 />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Typography variant="h2" 
        sx={styles.errorTitle}
        >
          404 - Page not found
        </Typography>
        <Typography
        sx={styles.errorParagraph}
        >
          The page you are looking for might have been removed had its name changed or is
          temporarily unavailable.
        </Typography>
        <Typography>
          <Button href="/" 
          sx={styles.errorButton}
          >
            Go To Homepage
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Error404Page;
