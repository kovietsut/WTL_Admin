import { Box, ButtonBase, SvgIcon, Collapse } from '@mui/material';
import { ReactNode, useState, useCallback } from 'react';
import Iconify from '../atoms/Iconify';

type SideNavItemProps = {
  active?: boolean;
  children?: ReactNode;
  depth?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
};

export const SideNavItem: React.FC<SideNavItemProps> = (props) => {
  const {
    active = false,
    children,
    depth = 0,
    disabled = false,
    external = false,
    icon,
    label,
    open: openProp = false,
    path,
    title,
  } = props;

  const [open, setOpen] = useState(!!openProp);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  let startIcon: ReactNode;

  if (depth === 0) {
    startIcon = icon;
  } else {
    startIcon = (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: 20,
          justifyContent: 'center',
          width: 20,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'var(--nav-item-icon-color)',
            borderRadius: '50%',
            height: 4,
            opacity: 0,
            width: 4,
            ...(active && {
              backgroundColor: 'var(--nav-item-icon-active-color)',
              height: 6,
              opacity: 1,
              width: 6,
            }),
          }}
        />
      </Box>
    );
  }

  const offset = depth === 0 ? 0 : (depth - 1) * 16;

  if (children) {
    return (
      <li>
        <ButtonBase
          disabled={disabled}
          onClick={handleToggle}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: `${16 + offset}px`,
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              ...(depth === 0 && {
                backgroundColor: 'var(--nav-item-active-bg)',
              }),
            }),
            '&:hover': {
              backgroundColor: 'var(--nav-item-hover-bg)',
            },
          }}
        >
          {startIcon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'var(--nav-item-icon-color)',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'var(--nav-item-icon-active-color)',
                }),
              }}
            >
              {startIcon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              // color: 'var(--nav-item-color)',
              color: '#9da4ae',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: depth > 0 ? 13 : 14,
              fontWeight: depth > 0 ? 500 : 600,
              lineHeight: '26px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'var(--nav-item-active-color)',
              }),
              ...(disabled && {
                color: 'var(--nav-item-disabled-color)',
              }),
            }}
          >
            {title}
          </Box>
          <SvgIcon
            sx={{
              color: 'var(--nav-item-chevron-color)',
              fontSize: 16,
              ml: 2,
            }}
          >
            {open ? (
              <Iconify icon="eva:chevron-down-outline" />
            ) : (
              <Iconify icon="eva:chevron-right-fill" />
            )}
          </SvgIcon>
        </ButtonBase>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </li>
    );
  }

  const linkProps = path
    ? external
      ? {
          component: 'a' as 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: 'a' as 'a',
          href: path,
          target: '_blank',
        }
    : {};

  return (
    <li>
      <ButtonBase
        disabled={disabled}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: `${16 + offset}px`,
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            ...(depth === 0 && {
              backgroundColor: 'var(--nav-item-active-bg)',
              // backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }),
          }),
          '&:hover': {
            backgroundColor: 'var(--nav-item-hover-bg)',
          },
        }}
        {...linkProps}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'var(--nav-item-icon-color)',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'var(--nav-item-icon-active-color)',
              }),
            }}
          >
            {startIcon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            // color: 'var(--nav-item-color)',
            color: '#9da4ae',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: depth > 0 ? 14 : 15,
            fontWeight: depth > 0 ? 500 : 600,
            lineHeight: '26px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'var(--nav-item-active-color)',
            }),
            ...(disabled && {
              color: 'var(--nav-item-disabled-color)',
            }),
          }}
        >
          {title}
        </Box>
        {label && (
          <Box component="span" sx={{ ml: 2 }}>
            {label}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};
