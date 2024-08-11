import UserAddForm from './UserAddForm';
import UserDetailForm from './UserDetailForm';
import UserEditForm from './UserEditForm';

type DrawerMode = 'add' | 'edit' | 'detail';

export const renderForm = (drawerMode: DrawerMode) => {
  switch (drawerMode) {
    case 'add':
      return <UserAddForm />;
    case 'edit':
      return <UserEditForm />;
    case 'detail':
      return <UserDetailForm />;
    default:
      return null;
  }
};
