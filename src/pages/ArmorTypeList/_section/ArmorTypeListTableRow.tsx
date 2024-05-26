import Iconify from '@/components/atoms/Iconify';
import { TArmorType } from '@/interfaces/armorType';
import { useVersion } from '@/store/module/version/useVersion';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableRowProps,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface Props extends TableRowProps {
  row: TArmorType;
}
export default function ArmorTypeListTableRow({ row }: Props) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const onEditClick = (): void => {
    setVisible(!visible);
  };

  const onSave = (): void => {
    setVisible(false);
  };

  const onCancel = (): void => {
    setVisible(false);
  };

  const onDelete = (): void => {
    setVisible(false);
  };

  const handleItemClick = (item: string): void => {
    if (item === selected) {
      setSelected(null);
    } else setSelected(item);
  };

  const { version } = useVersion();

  const isAllVersion = version === 'all';

  useEffect(() => {
    useVersion.subscribe(() => {
      setVisible(false);
    });
  }, []);

  return (
    <>
      <TableRow
        hover={!visible}
        sx={{
          '& .MuiTableCell-root': visible ? {} : { borderBottom: 'none' },
        }}
      >
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={row.icon}
              alt="armor type icon"
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                mr: 1,
              }}
            />
            {row.name}
          </Box>
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>
          <IconButton onClick={onEditClick}>
            {!isAllVersion && (
              <Iconify icon={visible ? 'mdi:edit-off' : 'mdi:edit'} width={20} height={20} />
            )}
            {isAllVersion && (
              <Iconify
                icon={visible ? 'mdi:file-document-check' : 'mdi:file-document-edit-outline'}
                width={20}
                height={20}
              />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} />
        <TableCell colSpan={2} sx={{ paddingY: 0 }}>
          {visible && row?.changeLog && isAllVersion && (
            <Stack my={1} spacing={0.5}>
              <Typography variant="subtitle2" fontWeight={500}>
                Change logs
              </Typography>
              <Table size="small">
                <TableHead
                  sx={{
                    '& .MuiTableCell-root': {
                      paddingY: 0.5,
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>Version</TableCell>
                    <TableCell>Item Changed</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.changeLog.map((item, index) => (
                    <TableRow key={item.version}>
                      <TableCell component="th" scope="row">
                        {`${item.version} ${index === 0 ? `(*latest)` : ''}`}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5}>
                          {item.changes?.map((x) => (
                            <Chip label={x} key={x} size="small" />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>{format(item.date, 'd/M/Y')}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleItemClick(item.version)}>
                          <Iconify
                            icon={Boolean(selected === item.version) ? 'mdi:edit-off' : 'mdi:edit'}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Stack>
          )}
          {visible && (isAllVersion ? selected : true) && (
            <Stack mt={1} mb={2.5} spacing={1}>
              <Stack direction="row" spacing={1}>
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    Icon
                  </Typography>
                  <div>
                    <TextField value={row.icon} />
                  </div>
                </Stack>
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    Name
                  </Typography>
                  <div>
                    <TextField value={row.name} />
                  </div>
                </Stack>
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" fontWeight={500}>
                  Description
                </Typography>
                <TextField value={row.description} multiline rows={6} />
              </Stack>
              <Box display="flex" gap={1}>
                <Button variant="contained" onClick={onSave} disableElevation>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                <Box flexGrow={1} />
                <IconButton color="error" onClick={onDelete}>
                  <Iconify icon="material-symbols:delete-outline-rounded" width={20} height={20} />
                </IconButton>
              </Box>
            </Stack>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
