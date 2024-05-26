import { Container, Typography } from '@mui/material';
import ArmorTypeListTable from './_section/ArmorTypeListTable';

const ArmorTypeListPage = (): JSX.Element => {
  return (
    <>
      <Container sx={{ p: 3 }} maxWidth="xl">
        <Typography variant="h3" mb={3}>
          Armor Type
        </Typography>
        <ArmorTypeListTable />
      </Container>
    </>
  );
};

export default ArmorTypeListPage;
