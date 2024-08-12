import Iconify from '@/components/atoms/Iconify';
import PropertyList from '@/components/atoms/PropertyList';
import PropertyListItem from '@/components/molecules/ProperlyListItem';
import useResponsive from '@/libs/hooks/useResponsive';
import { useFetchUserById } from '@/services/user';
import { getInitials } from '@/utils/getInitials';
import { convertRoleNumberToRoleName } from '@/utils/utils';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { memo } from 'react';
import { useUserStore } from '../User.state';

const UserDetailForm = () => {
  const lgUp = useResponsive('up', 'lg');
  const align = lgUp ? 'horizontal' : 'vertical';
  const { userId } = useUserStore();
  const { data, error } = useFetchUserById(userId);
  const user = data?.data;
  const createdAt = user?.createdAt && format(parseISO(user?.createdAt), 'dd/MM/yyyy HH:mm');
  const modifiedAt = user?.modifiedAt && format(parseISO(user?.modifiedAt), 'dd/MM/yyyy HH:mm');

  if (error) return <Typography color="textSecondary">Something went wrong</Typography>;

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
          <Typography variant="h6">Details</Typography>
          <Button
            color="inherit"
            onClick={() => {}}
            size="small"
            startIcon={
              <Iconify sx={{ mr: 1 }} icon="material-symbols:edit" width={24} height={24} />
            }
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={user?.id ? user?.id.toString() : '-'}
          />
          <PropertyListItem align={align} disableGutters divider label="User">
            <Avatar
              src={user?.avatarPath}
              sx={{
                height: 42,
                width: 42,
                marginBottom: 1,
              }}
            >
              {getInitials(user?.fullName)}
            </Avatar>
            <Typography color="text.secondary" variant="body2">
              {user?.fullName ?? '-'}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.address ?? '-'}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Role"
            value={user?.roleId ? convertRoleNumberToRoleName(user?.roleId) : '-'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Phone Number"
            value={user?.phoneNumber ?? '-'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Email"
            value={user?.email ?? '-'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Gender"
            value={user?.gender ?? '-'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Created At"
            value={createdAt ?? '-'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Modified At"
            value={modifiedAt ?? '-'}
          />
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button onClick={() => {}} size="small" variant="contained">
            Approve
          </Button>
          <Button color="error" onClick={() => {}} size="small" variant="outlined">
            Reject
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(UserDetailForm);
