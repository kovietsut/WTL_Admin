import Iconify from '@/components/atoms/Iconify';
import MenuPopover from '@/components/atoms/MenuPopover';
import Scrollbar from '@/components/atoms/ScrollBar';
import { TUser } from '@/interfaces/user';
import { useFetchUser } from '@/services/user';
import { getInitials } from '@/utils/getInitials';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Link,
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
import { requestUsers } from '../User.state';

type Props = {
  count?: number;
  lists?: TUser[];
  onDeselectAll?: () => void;
  onDeselectOne?: (id: number) => void;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (id: number) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: number[];
  openPopover?: HTMLElement | null;
  onOpenAction?: (event: React.MouseEvent<HTMLElement>) => void;
  onCloseAction?: () => void;
};

export const UserListTable = ({
  count = 0,
  onDeselectAll,
  onDeselectOne,
  onPageChange = () => {},
  onRowsPerPageChange,
  onSelectAll,
  onSelectOne,
  page = 0,
  rowsPerPage = 0,
  selected = [],
  // Open Popover Action
  openPopover,
  onOpenAction,
  onCloseAction,
}: Props) => {
  const { data, error, isLoading } = useFetchUser(requestUsers);
  const lists = data?.data;

  const selectedSome = lists && selected.length > 0 && selected.length < lists.length;
  const selectedAll = lists && lists.length > 0 && selected.length === lists.length;

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
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
          <TableBody>
            {lists &&
              lists?.map((user) => {
                const isSelected = selected.includes(user.userId);
                return (
                  <TableRow hover key={user.userId} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.userId);
                          } else {
                            onDeselectOne?.(user.userId);
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
                          <Link color="inherit" href="#" variant="subtitle2">
                            {user.fullName}
                          </Link>
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
                      <IconButton href="#" onClick={onOpenAction}>
                        <Iconify icon="ri:more-fill" width={24} height={24} />
                      </IconButton>
                      <MenuPopover
                        open={Boolean(openPopover)}
                        anchorEl={openPopover}
                        onClose={onCloseAction}
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
                        <MenuItem>
                          <Button
                            variant="text"
                            startIcon={
                              <Iconify icon="material-symbols:edit" width={24} height={24} />
                            }
                          >
                            Edit
                          </Button>
                        </MenuItem>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <MenuItem>
                          <Button
                            variant="text"
                            color="error"
                            startIcon={
                              <Iconify icon="material-symbols:delete" width={24} height={24} />
                            }
                          >
                            Delete
                          </Button>
                        </MenuItem>
                      </MenuPopover>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};
