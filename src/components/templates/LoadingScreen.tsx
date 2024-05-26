import { SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// import ProgressBar from './ProgressBar';
import Logo from '../atoms/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  sx?: SxProps;
};

export default function LoadingScreen({ isDashboard, ...other }: Props) {
  return (
    <>
      {/* <ProgressBar /> */}

      {!isDashboard && (
        <RootStyle {...other}>
          <Logo />
        </RootStyle>
      )}
    </>
  );
}
