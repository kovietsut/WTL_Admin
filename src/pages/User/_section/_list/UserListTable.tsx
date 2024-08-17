import Iconify from '@/components/atoms/Iconify';
import { DEBOUNCE_TIME } from '@/config';
import { useSelection } from '@/libs/hooks/useSelection';
import { useFetchUser, useUserDeleteList } from '@/services/user';
import useDebounce from '@/shared/use/useDebounce';
import useTable from '@/shared/use/useTable';
import { getInitials } from '@/utils/getInitials';
import { arrayToString, convertTabValueToNumber } from '@/utils/utils';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useUsersIds, useUserStore } from '../../User.state';
import { Endpoint } from '@/libs/helpers/endpoint';
import { queryClient } from '@/utils/reactQuery';
import toast from 'react-hot-toast';

type TProps = {};

type TRef = {
  setSearchText: (searchText: string) => void;
};

export const UserListTable = forwardRef<TRef, TProps>((_, ref) => {
  const { currentTab: roleId, setOpenDrawer, setDrawerMode, setUserId } = useUserStore();

  const { rowsPerPage, page, onChangePage, onChangeRowsPerPage } = useTable();
  const [searchText, setSearchText] = useState('');

  const debounceSearchText = useDebounce(searchText, DEBOUNCE_TIME);

  const { data, error } = useFetchUser({
    pageNumber: page + 1,
    pageSize: rowsPerPage,
    searchText: debounceSearchText,
    roleId: convertTabValueToNumber(roleId) ?? undefined,
  });

  const lists = data?.data;
  const usersIds = useUsersIds(lists);
  const usersSelection = useSelection(usersIds);

  const selectedSome =
    lists && usersSelection.selected.length > 0 && usersSelection.selected.length < lists.length;
  const selectedAll = lists && lists.length > 0 && usersSelection.selected.length === lists.length;
  const enableBulkActions = usersSelection.selected.length > 0;

  const handleDetailUser = (userId: number) => {
    setDrawerMode && setDrawerMode('detail');
    setOpenDrawer && setOpenDrawer(true);
    setUserId && userId && setUserId(userId);
  };

  useImperativeHandle(ref, () => ({
    setSearchText: (searchText: string) => setSearchText(searchText),
  }));

  const { mutateAsync: deleteUser } = useUserDeleteList(arrayToString(usersSelection.selected));

  const onDelete = async () => {
    const result = await deleteUser(arrayToString(usersSelection.selected));
    if (result.status === 200) {
      toast.success('Delete Success');
    }
    usersSelection.handleDeselectAll?.();
    queryClient.invalidateQueries({ queryKey: [Endpoint.user.search] });
  };

  if (error)
    return (
      <TableRow hover>
        <TableCell colSpan={7}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography color="textSecondary">Something went wrong</Typography>
          </Box>
        </TableCell>
      </TableRow>
    );

  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        {enableBulkActions ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              display: enableBulkActions ? 'flex' : 'none',
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 10,
              padding: 0.7,
            }}
          >
            <Checkbox
              checked={selectedAll}
              indeterminate={selectedSome}
              onChange={(event) => {
                if (event.target.checked) {
                  usersSelection.handleSelectAll?.();
                } else {
                  usersSelection.handleDeselectAll?.();
                }
              }}
            />
            <Button color="error" size="small" onClick={onDelete}>
              Delete
            </Button>
          </Stack>
        ) : (
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      usersSelection.handleSelectAll?.();
                    } else {
                      usersSelection.handleDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {lists && lists?.length > 0 ? (
            lists?.map((user) => {
              const isSelected = usersSelection.selected.includes(user.userId);
              return (
                <TableRow hover key={user.userId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          usersSelection.handleSelectOne?.(user.userId);
                        } else {
                          usersSelection.handleDeselectOne?.(user.userId);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={user.avatarPath}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(user.fullName)}
                      </Avatar>
                      <div>
                        <Typography color="inherit" variant="subtitle2">
                          {user.fullName}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {user.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.roleName}</TableCell>
                  <TableCell align="right">
                    <IconButton href="#" onClick={() => handleDetailUser(user.userId)}>
                      <Iconify icon="bx:detail" width={24} height={24} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow hover>
              <TableCell colSpan={7}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="textSecondary">There are no data</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={data?.dataCount ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Box>
  );
});
