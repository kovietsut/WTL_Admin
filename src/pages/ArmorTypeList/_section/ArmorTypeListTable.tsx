import { armorType } from '@/_mock/_armorType';
import TableHeadCustom, { HeadLabel } from '@/components/atoms/TableHeadCustom';
import useTable from '@/shared/use/useTable';
import { Card, Table, TableBody, TableContainer } from '@mui/material';
import ArmorTypeListTableRow from './ArmorTypeListTableRow';

const HEAD_LABEL: HeadLabel[] = [
  { id: 'armorType', label: 'Armor Type', width: '20%' },
  { id: 'description', label: 'Description' },
  { id: 'action', label: '' },
];

export default function ArmorTypeListTable() {
  const { onSort, order, orderBy } = useTable();
  return (
    <>
      <TableContainer component={Card} elevation={0}>
        <Table size="small">
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            rowCount={armorType.length}
            onSort={onSort}
            headLabel={HEAD_LABEL}
          />
          <TableBody>
            {armorType.map((row) => (
              <ArmorTypeListTableRow row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
