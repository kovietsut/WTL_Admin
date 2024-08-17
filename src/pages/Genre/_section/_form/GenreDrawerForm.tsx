import GenreAddForm from './GenreAddForm';
import GenreDetailForm from './GenreDetailForm';
import GenreEditForm from './GenreEditForm';

type DrawerMode = 'add' | 'edit' | 'detail';

export const renderForm = (drawerMode: DrawerMode) => {
  switch (drawerMode) {
    case 'add':
      return <GenreAddForm />;
    case 'edit':
      return <GenreEditForm />;
    case 'detail':
      return <GenreDetailForm />;
    default:
      return null;
  }
};
