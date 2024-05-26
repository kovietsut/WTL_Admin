import { SettingsContext } from '@/store/SettingsContext';
import { useContext } from 'react';

const useSettings = () => useContext(SettingsContext);

export default useSettings;
