import { PaletteColor, SxProps, Theme } from '@mui/material';

export type TStyle = { [key: string]: TStyle | SxProps };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TTheme = Theme & { palette: PaletteColor | any };
