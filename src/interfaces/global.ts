export type TGlobalState = {
  openThemeSetting: boolean;
};

export type TGlobalEvent = {
  toggleThemeSetting: () => void;
  setOpenThemeSetting: (value: boolean) => void;
};

export type TGlobalStore = TGlobalState & TGlobalEvent;
