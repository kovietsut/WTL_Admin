import { TState } from '@/interfaces/common/object';
import { create } from 'zustand';

type ArmorTypeListEvent = {};
interface ArmorTypeListState extends TState {}

type ArmorTypeListStore = ArmorTypeListEvent & ArmorTypeListState;

const initialState: ArmorTypeListState = {
  isLoading: false,
};

const state = create<ArmorTypeListStore>((set, get) => ({
  ...initialState,
}));

export default state;
