import useResponsive from '@/libs/hooks/useResponsive';
import { SideNav } from '../../molecules/SideNav';
import { useSections, useSettings } from './Sidebar.state';

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const settings = useSettings();
  const sections = useSections();
  const lgUp = useResponsive('up', 'lg');
  //   const mobileNav = useMobileNav();

  return (
    <>
      {lgUp && <SideNav color={settings.navColor} sections={sections} />}
      {/* {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )} */}
    </>
  );
};

export default Sidebar;
