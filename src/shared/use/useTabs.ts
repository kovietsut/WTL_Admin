import { useState } from 'react';

export default function useTabs(defaultValues?: string) {
  const [currentTab, setCurrentTab] = useState(defaultValues || '');

  return {
    currentTab,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChangeTab: (_: React.SyntheticEvent<Element, Event>, newValue: any) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
