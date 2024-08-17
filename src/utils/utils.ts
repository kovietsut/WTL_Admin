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

export const convertRoleNumberToRoleName = (roleId: number) => {
  switch (roleId) {
    case 1:
      return 'Admin';
    case 2:
      return 'Author';
    case 3:
      return 'Reader';
    case 4:
      return 'Translator';
    default:
      return undefined;
  }
};

export const arrayToString = (arr: number[]): string => {
  return arr.join(',');
};
