import Iconify from '@/components/atoms/Iconify';
import { Divider, IconButton, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import styled from 'styled-components';
import { avatars } from '../Profile.state';

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const buttonStyle = {
  position: 'relative',
  left: 90,
  bottom: 35,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadAvatarModal = () => {
  const [img, setImg] = useState('');
  const editor = useRef<AvatarEditor | null>(null);
  const [src, setSrc] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [displayXButton, setDisplayXButton] = useState(-1);
  const [steps, setSteps] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setEditorRef = (editor: any) => (editor = editor);
  const showXButton = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setDisplayXButton(id);
    setIsHover(true);
  };

  const hideXButton = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setDisplayXButton(id);
    setIsHover(false);
  };

  const nextStep = () => setSteps((previousStep) => previousStep + 1);
  const previousStep = () => setSteps((previousStep) => previousStep - 1);

  const handleSave = () => {
    if (editor.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas: HTMLCanvasElement = editor.current.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled: HTMLCanvasElement = editor.current.getImageScaledToCanvas();
    }
    nextStep();
  };

  return (
    <>
      <Button sx={buttonStyle} size="large" onClick={handleOpen}>
        <Iconify fontSize={30} color={'text.secondary'} icon={'clarity:note-edit-solid'} />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            {/* STEP 1 */}
            <Stack direction="column" spacing={3}>
              {steps !== 1 && (
                <Stack
                  direction="row"
                  sx={{
                    width: 50,
                    height: 50,
                    position: 'relative',
                  }}
                >
                  <IconButton onClick={previousStep} sx={{ width: 50, height: 50 }} color="primary">
                    <Iconify icon="ph:arrow-left-bold" />
                  </IconButton>
                </Stack>
              )}
              {steps === 1 && (
                <>
                  <Button
                    sx={{ width: '50%' }}
                    variant="outlined"
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                  >
                    Select from device
                    <VisuallyHiddenInput type="file" accept=".jpg, .jpeg, .png" />
                  </Button>
                  <Divider variant="fullWidth" />
                  <Typography variant="h6">Your avatars</Typography>
                  <Stack direction="row" spacing={3}>
                    {avatars.map((avatar) => (
                      <Stack
                        key={avatar.id}
                        direction="row"
                        sx={{
                          width: 50,
                          height: 50,
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          onMouseEnter={(e) => showXButton(e, avatar.id)}
                          onMouseLeave={(e) => hideXButton(e, -1)}
                          onClick={nextStep}
                          sx={{
                            '&:hover': {
                              boxShadow: 'none',
                              backgroundColor: 'transparent',
                            },
                          }}
                        >
                          <Avatar
                            alt={avatar.alt}
                            src={avatar.src}
                            sx={{ width: 50, height: 50 }}
                          />
                        </IconButton>
                        {isHover && displayXButton === avatar.id && (
                          <Button
                            onMouseEnter={(e) => showXButton(e, avatar.id)}
                            onMouseLeave={(e) => hideXButton(e, -1)}
                            sx={{
                              width: 15,
                              height: 15,
                              position: 'relative',
                              right: 45,
                              top: -5,
                              '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                              },
                            }}
                            onClick={handleOpen}
                          >
                            <Iconify color="text.secondary" icon="material-symbols:cancel" />
                          </Button>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}

              {/* STEP 2 */}
              {steps === 2 && (
                <Stack direction="column" alignItems="center" spacing={2}>
                  <AvatarEditor
                    ref={setEditorRef}
                    image="https://scontent.fhan3-2.fna.fbcdn.net/v/t31.18172-8/475968_279662528836934_2112013266_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFp0L3cR0qsh18rJ2siAIKtNljnvx9So482WOe_H1Kjj99gDnfF8Ws8PcPetotQpDUfy2e3_-GUrCZWGTMA0-Y8&_nc_ohc=YaidAB-1N_4Q7kNvgHKjjMW&_nc_ht=scontent.fhan3-2.fna&oh=00_AYDjZs6BUwdbe2JDbDJQhNzQtV2008ocZx1NwFgJqzB5WA&oe=66E0E191"
                    width={300}
                    height={300}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1.2}
                    rotate={0}
                  />
                  <Button sx={{ width: 30 }} variant="contained" onClick={handleSave}>
                    Save
                  </Button>
                </Stack>
              )}
              {steps === 3 && <Typography>S3</Typography>}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UploadAvatarModal;
