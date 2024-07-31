import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';

export type User = {
  userId: number;
  isEnabled?: boolean;
  fullName: string;
  email: string;
  avatarPath?: string;
  phoneNumber: string;
  gender: string;
  address: string;
  roleId: number;
  roleName: string;
};

export const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Author',
    value: 'author',
  },
  {
    label: 'Reader',
    value: 'reader',
  },
  {
    label: 'Translator',
    value: 'translator',
  },
];

export const useUserSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  // const handleFiltersChange = useCallback((filters) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     filters,
  //   }));
  // }, []);

  const handlePageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setState((prevState) => ({
        ...prevState,
        newPage,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: BaseSyntheticEvent) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    // handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

export const useUsersIds = (users: User[] = []) => {
  return useMemo(() => {
    return users.map((user) => user.userId);
  }, [users]);
};

export const lists: User[] = [
  {
    userId: 10007,
    isEnabled: true,
    fullName: 'Test',
    email: 'test8@gmail.com',
    phoneNumber: '0989123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 10006,
    isEnabled: true,
    fullName: 'Test',
    email: 'test7@gmail.com',
    phoneNumber: '0979123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 10005,
    isEnabled: true,
    fullName: 'Test',
    email: 'test6@gmail.com',
    phoneNumber: '0939123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 10004,
    isEnabled: true,
    fullName: 'Test',
    email: 'test5@gmail.com',
    phoneNumber: '0929123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 10003,
    isEnabled: true,
    fullName: 'Test',
    email: 'test4@gmail.com',
    phoneNumber: '0919123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 10002,
    isEnabled: true,
    fullName: 'Test',
    email: 'test3@gmail.com',
    phoneNumber: '0909123305',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 4,
    isEnabled: true,
    fullName: 'Test',
    email: 'test2@gmail.com',
    phoneNumber: '0909123312',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 3,
    isEnabled: true,
    fullName: 'Phuc Beo',
    email: 'test1@gmail.com',
    phoneNumber: '0913246357',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 2,
    isEnabled: true,
    fullName: 'Test',
    email: 'test@gmail.com',
    phoneNumber: '0909123315',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Viet Nam',
    roleId: 2,
    roleName: 'AUTHOR',
  },
  {
    userId: 1,
    isEnabled: true,
    fullName: 'Phat Nguyen',
    email: 'nguyentienphat9x@gmail.com',
    phoneNumber: '0369427565',
    avatarPath:
      'https://cdn.discordapp.com/attachments/920118435726389288/1264545993148338297/444502408_3133754933427665_7433605137574256074_n.jpg?ex=669e43ba&is=669cf23a&hm=15b4bc242cfcfc311e5300b5dc5277c3b7d247ce8d49777b172238bd28e9c814&',
    gender: 'Nam',
    address: 'Ho Chi Minh',
    roleId: 1,
    roleName: 'ADMIN',
  },
];
