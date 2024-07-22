import { Box, Typography, Button, Grid } from '@mui/material';
import useStyle from './Error.styles';
import SVGIconify from '@/components/atoms/SvgIconify';

const Error403Page = (): JSX.Element => {
  const styles = useStyle();
  return (
    <Box sx={styles.errorContainer}>
      <Box>
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <SVGIconify name="Ic403" />
            </Box>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        <Typography variant="h2" sx={styles.errorTitle}>
          403 - Forbidden
        </Typography>
        <Typography sx={styles.errorParagraph}>
          Resource forbidden. It seem you don not have permission to access this page.
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

export default Error403Page;
