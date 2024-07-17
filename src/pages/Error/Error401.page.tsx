import { Box, Typography, Button, Stack, Tooltip, Grid } from '@mui/material';
import useStyle from './Error.styles';
import { Icon401 } from './images/Icon401';

const Error401Page = (): JSX.Element => {
  const styles = useStyle();
  return (
    <Box sx={styles.errorContainer}>
      <Box>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box  display="flex" alignItems="center">
              <Icon401 />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Typography variant="h2" 
        sx={styles.errorTitle}
        >
          401 - Authorization required
        </Typography>
        <Typography
        sx={styles.errorParagraph}
        >
          Please log in to access this resource.
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

export default Error401Page;
