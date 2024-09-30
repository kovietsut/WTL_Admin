import Chapter from '@/pages/Chapter';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

const InformationSection = () => {
  return (
    <>
      <Box
        sx={{
          color: 'white',
          p: 4,
          backgroundColor: '#111927',
          borderRadius: '8px',
          mt: 4,
          textAlign: 'center',
        }}
      >
        {/* Release Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#16B364' }}>RELEASE ON</span>{' '}
          <span style={{ color: 'white' }}>MONDAY AND THURSDAY</span>
        </Typography>
        <Typography variant="body1" sx={{ mt: 4 }}>
          What started out as an ordinary day turned ominous when an unknown catastrophe struck
          Earth, transporting the protagonist into a world of dungeons and monsters. Faced with
          endless battles and the need to grow stronger with each encounter, the protagonist embarks
          on a journey of survival, power, and revenge. With the fate of the world hanging in the
          balance, will the protagonist rise to become the strongest of all?
        </Typography>

        {/* Chapters Layout */}
        <Divider sx={{ mt: 6 }} />
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '8px', padding: '10px 20px' }}
            onClick={() => {}}
          >
            Add Chapter
          </Button>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Chapter />
        </Box>
      </Box>
      {/* Footer Layout */}
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: 'center',
          backgroundColor: '#111927',
          padding: '40px',
          color: 'white',
          borderRadius: '8px',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box sx={{ maxWidth: '500px' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, marginBottom: '16px' }}>
            <span style={{ fontWeight: 400 }}>UPDATE</span>{' '}
            <span style={{ color: '#16B364' }}>EVERYDAY</span>{' '}
            <span style={{ fontWeight: 400 }}>ONLY AT WTL</span>
          </Typography>
          <Typography variant="body1" component="p" sx={{ marginBottom: '24px' }}>
            Comics are always updated at 10AM and there is a notification if the comic will be on
            holiday. So stay tuned at{' '}
            <span style={{ fontWeight: 700 }}>Daily Update Schedule.</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email address"
              InputProps={{
                sx: { backgroundColor: 'white', borderRadius: '30px', padding: '5px 15px' },
              }}
              sx={{ flexGrow: 1, marginRight: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '30px', padding: '10px 20px' }}
            >
              Get Notification
            </Button>
          </Box>
        </Box>
        <Box
          component="img"
          src="/assets/comic_detail.png"
          alt="Samurai"
          sx={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      </Box>
    </>
  );
};

export default InformationSection;
