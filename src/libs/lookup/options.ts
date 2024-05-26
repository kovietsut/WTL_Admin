export type TOption = {
  id: string;
  value: string;
  link?: string;
};

export const VERSION_OPTIONS: TOption[] = [
  { id: '1', value: 'v1.0.0' },
  { id: '2', value: 'v1.0.1' },
  { id: '3', value: 'v1.0.2' },
  { id: '4', value: 'v1.0.3' },
  { id: 'all', value: 'All' },
];

export const SETTING_OPTIONS: TOption[] = [{ id: '1', value: 'Profile' }];
