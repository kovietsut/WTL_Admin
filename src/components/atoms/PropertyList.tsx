import { List } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PropertyList = ({ children }: Props) => {
  return <List disablePadding>{children}</List>;
};

export default PropertyList;
