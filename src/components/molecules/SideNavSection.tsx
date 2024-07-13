import { Box, Stack } from '@mui/material';
import { SideNavItem } from './SideNavItem';

type Item = {
  path?: string;
  title: string;
  items?: Item[];
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: string;
  external?: boolean;
};

type RenderItemsProps = {
  depth?: number;
  items: Item[];
  pathname: string;
};

const renderItems = ({ depth = 0, items, pathname }: RenderItemsProps): JSX.Element[] => {
  return items.reduce((acc: JSX.Element[], item: Item) => {
    return reduceChildRoutes({
      acc,
      depth,
      item,
      pathname,
    });
  }, []);
};

type ReduceChildRoutesProps = {
  acc: JSX.Element[];
  depth: number;
  item: Item;
  pathname: string;
};

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  pathname,
}: ReduceChildRoutesProps): JSX.Element[] => {
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname.includes(item.path!) : false;
  const exactMatch = checkPath ? pathname === item.path : false;

  if (item.items) {
    acc.push(
      <SideNavItem
        active={partialMatch}
        depth={depth}
        disabled={item.disabled}
        icon={item.icon}
        key={item.title}
        label={item.label}
        open={partialMatch}
        title={item.title}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {renderItems({
            depth: depth + 1,
            items: item.items,
            pathname,
          })}
        </Stack>
      </SideNavItem>
    );
  } else {
    acc.push(
      <SideNavItem
        active={exactMatch}
        depth={depth}
        disabled={item.disabled}
        external={item.external}
        icon={item.icon}
        key={item.title}
        label={item.label}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

type SideNavSectionProps = {
  items?: Item[];
  pathname: string;
  subheader?: string;
  [key: string]: unknown;
};

export const SideNavSection: React.FC<SideNavSectionProps> = ({
  items = [],
  pathname,
  subheader = '',
  ...other
}) => {
  return (
    <Stack
      component="ul"
      spacing={0.5}
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
      {...other}
    >
      {subheader && (
        <Box
          component="li"
          sx={{
            color: 'var(--nav-section-title-color)',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.66,
            mb: 1,
            ml: 1,
            textTransform: 'uppercase',
          }}
        >
          {subheader}
        </Box>
      )}
      {renderItems({ items, pathname })}
    </Stack>
  );
};
