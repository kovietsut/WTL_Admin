import { TArmorType, TArmorTypeChangeLog } from '@/interfaces/armorType';
import { _mock } from '.';
import { randomInArray, randomNumberRange } from './funcs';

export const armorTypeChangeLog: TArmorTypeChangeLog[] = Array.from({ length: 4 }, (_, i) => ({
  version: _mock.text.version(i),
  date: _mock.time(i),
  changes: Array.from({ length: randomNumberRange(0, 2) }, (_, i) =>
    randomInArray(['icon', 'description', 'name'])
  ) as string[],
}));

export const armorType: TArmorType[] = Array.from({ length: 15 }, (_, i) => ({
  id: _mock.id(i),
  name: _mock.things(i),
  icon: _mock.image.icon(i),
  description: _mock.text.description(i),
  changeLog: armorTypeChangeLog,
}));
