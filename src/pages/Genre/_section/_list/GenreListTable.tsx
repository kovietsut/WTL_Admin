import Iconify from '@/components/atoms/Iconify';
import { DEBOUNCE_TIME } from '@/config';
import { useSelection } from '@/libs/hooks/useSelection';
import { useFetchGenre, useGenreDeleteList } from '@/services/genre';
import useDebounce from '@/shared/use/useDebounce';
import useTable from '@/shared/use/useTable';
import {
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
import { useGenresIds, useGenreStore } from '../../Genre.state';
import { arrayToString } from '@/utils/utils';
import { Endpoint } from '@/libs/helpers/endpoint';
import toast from 'react-hot-toast';
import { queryClient } from '@/utils/reactQuery';

type TProps = {};

type TRef = {
  setSearchText: (searchText: string) => void;
};

export const GenreListTable = forwardRef<TRef, TProps>((_, ref) => {
  const { setOpenDrawer, setDrawerMode, setGenreId } = useGenreStore();

  const { rowsPerPage, page, onChangePage, onChangeRowsPerPage } = useTable();
  const [searchText, setSearchText] = useState('');

  const debounceSearchText = useDebounce(searchText, DEBOUNCE_TIME);

  const { data, error } = useFetchGenre({
    pageNumber: page + 1,
    pageSize: rowsPerPage,
    searchText: debounceSearchText,
  });

  const lists = data?.data;
  const genresIds = useGenresIds(lists);
  const genresSelection = useSelection(genresIds);

  const selectedSome =
    lists && genresSelection.selected.length > 0 && genresSelection.selected.length < lists.length;
  const selectedAll = lists && lists.length > 0 && genresSelection.selected.length === lists.length;
  const enableBulkActions = genresSelection.selected.length > 0;

  const handleDetailGenre = (genreId: number) => {
    setDrawerMode && setDrawerMode('detail');
    setOpenDrawer && setOpenDrawer(true);
    setGenreId && genreId && setGenreId(genreId);
  };

  useImperativeHandle(ref, () => ({
    setSearchText: (searchText: string) => setSearchText(searchText),
  }));

  const { mutateAsync: deleteUser } = useGenreDeleteList(arrayToString(genresSelection.selected));

  const onDelete = async () => {
    const result = await deleteUser(arrayToString(genresSelection.selected));
    if (result.status === 200) {
      toast.success('Delete Success');
    }
    genresSelection.handleDeselectAll?.();
    queryClient.invalidateQueries({ queryKey: [Endpoint.genre.search] });
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
                  genresSelection.handleSelectAll?.();
                } else {
                  genresSelection.handleDeselectAll?.();
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
                      genresSelection.handleSelectAll?.();
                    } else {
                      genresSelection.handleDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {lists && lists?.length > 0 ? (
            lists?.map((genre) => {
              const isSelected = genresSelection.selected.includes(genre.genreId);
              return (
                <TableRow hover key={genre.genreId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          genresSelection.handleSelectOne?.(genre.genreId);
                        } else {
                          genresSelection.handleDeselectOne?.(genre.genreId);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                        <Typography color="inherit" variant="subtitle2">
                          {genre.name}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton href="#" onClick={() => handleDetailGenre(genre.genreId)}>
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
