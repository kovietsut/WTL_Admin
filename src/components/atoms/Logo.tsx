import { APP_NAME } from '@/config';
import { PATH } from '@/libs/helpers/routes';
import { Link, LinkProps } from '@mui/material';

interface Props extends LinkProps {}

export default function Logo(props: Props): JSX.Element {
  return (
    <Link href={PATH.home} variant="subtitle1" underline="none" color="common.white" {...props}>
      {APP_NAME}
    </Link>
  );
}
