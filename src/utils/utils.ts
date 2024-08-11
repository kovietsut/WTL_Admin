export const convertTabValueToNumber = (tabValue: string | null | undefined) => {
  switch (tabValue) {
    case 'admin':
      return 1;
    case 'author':
      return 2;
    case 'reader':
      return 3;
    case 'translator':
      return 4;
    case 'all':
    default:
      return null;
  }
};
