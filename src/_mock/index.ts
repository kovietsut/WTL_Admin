import { sub } from 'date-fns';

import { boolean } from './boolean';
import { firstName, fullName, lastName, things } from './name';
import { percent, rating, age, price } from './number';
import { title, sentence, description } from './text';

export const _mock = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  things: (index: number) => things[index],
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index],
  },
  text: {
    title: (index: number) => title[index],
    sentence: (index: number) => sentence[index],
    description: (index: number) => description[index],
    version: (index: number) => `v${index + 1}.0.0`,
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index],
  },
  image: {
    icon: (index: number) => `https://picsum.photos/seed/${index}/64/64`,
  },
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[index],
};
