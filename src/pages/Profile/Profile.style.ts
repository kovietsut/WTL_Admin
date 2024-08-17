import { TStyle } from '@/interfaces/common';

const useStyle = (): TStyle => {
  return {
    textField: {
      flex: 3,
      input: { color: '#fff' },
      backgroundColor: '#2a2a3e',
      '& .MuiInputBase-root': {
        height: 50,
      },
    },
    typography: {
      flex: 1,
      height: 50,
      display: 'flex',
      alignItems: 'center',
    },
    grid: {
      display: 'flex',
      marginBottom: '30px',
    },
  };
};

export default useStyle;
