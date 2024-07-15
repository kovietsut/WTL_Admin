import ThemeColorPresets from './ThemeColorPresets';
import ThemeContrast from './ThemeContrast';
import ThemeLocalization from './ThemeLocalization';
import ThemeRtlLayout from './ThemeRtlLayout';
import SettingsDrawer from './drawer';

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeLocalization>
          <ThemeRtlLayout>
            {children}
            <SettingsDrawer />
          </ThemeRtlLayout>
        </ThemeLocalization>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
