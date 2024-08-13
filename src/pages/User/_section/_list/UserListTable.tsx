import Iconify from '@/components/atoms/Iconify';
import MenuPopover from '@/components/atoms/MenuPopover';
import { DEBOUNCE_TIME } from '@/config';
import { useSelection } from '@/libs/hooks/useSelection';
import { useFetchUser } from '@/services/user';
import useDebounce from '@/shared/use/useDebounce';
import useTable from '@/shared/use/useTable';
import { getInitials } from '@/utils/getInitials';
import { convertTabValueToNumber } from '@/utils/utils';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
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

type TProps = {};

type TRef = {
  setSearchText: (searchText: string) => void;
};

export const UserListTable = forwardRef<TRef, TProps>((_, ref) => {
  const {
    currentTab: roleId,
    openPopover,
    setOpenPopover,
    setOpenDrawer,
    setDrawerMode,
    setUserId,
  } = useUserStore();

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

  const handleEditUser = () => {
    setDrawerMode && setDrawerMode('edit');
    setOpenDrawer && setOpenDrawer(true);
    setOpenPopover && setOpenPopover(null);
  };

  const handleDetailUser = () => {
    setDrawerMode && setDrawerMode('detail');
    setOpenDrawer && setOpenDrawer(true);
    setOpenPopover && setOpenPopover(null);
  };

  useImperativeHandle(ref, () => ({
    setSearchText: (searchText: string) => setSearchText(searchText),
  }));

  if (error) return <Typography color="textSecondary">Something went wrong</Typography>;

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
            <Button color="error" size="small">
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
                    <IconButton
                      href="#"
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        setOpenPopover && setOpenPopover(event);
                        setUserId && user.userId && setUserId(user.userId);
                      }}
                    >
                      <Iconify icon="ri:more-fill" width={24} height={24} />
                    </IconButton>
                    <MenuPopover
                      open={Boolean(openPopover)}
                      anchorEl={openPopover}
                      onClose={() => setOpenPopover && setOpenPopover(null)}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      sx={{
                        width: 120,

                        '& .MuiMenuItem-root': {
                          px: 1,
                          typography: 'body2',
                          borderRadius: 0.75,
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleDetailUser()}>
                        <Iconify sx={{ mr: 1 }} icon="bx:detail" width={24} height={24} />
                        <Typography variant="subtitle2">Detail</Typography>
                      </MenuItem>
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      <MenuItem onClick={() => handleEditUser()}>
                        <Iconify
                          sx={{ mr: 1 }}
                          icon="material-symbols:edit"
                          width={24}
                          height={24}
                        />
                        <Typography variant="subtitle2">Edit</Typography>
                      </MenuItem>
                    </MenuPopover>
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
