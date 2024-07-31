import { TStyle } from '@/interfaces/common';

// interface TStyle {
//   [key: string]: SxProps<Theme>;
// }

const useStyle = (): TStyle => {
  return {
    errorContainer: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    errorTitle: {
      fontFamily: "'Montserrat', sans-serif",
    },
    errorParagraph: {
      fontFamily: "'Montserrat', sans-serif",
    },
    errorButton: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
      marginTop: '5vh'
    },
  };
};

export default useStyle;
