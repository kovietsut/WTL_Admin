export type TArmorType = {
  id: string;
  name: string;
  description?: string;
  icon: string;
  changeLog?: TArmorTypeChangeLog[];
};

export type TArmorTypeChangeLog = {
  version: string;
  changes?: string[];
  date: Date;
};
