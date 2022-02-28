import create from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import IState from '../interfaces/IState';

const reducer = (set: any): IState => ({
  images: [],
  filteredImages: [],
  currentPage: 1,
  itemsPerPage: 12,

  setImages: (value) =>
    set(
      produce<IState>((state) => {
        state.images = value;
      }),
    ),

  setFilteredImages: (value) =>
    set(
      produce<IState>((state) => {
        state.filteredImages = value;
      }),
    ),
  setCurrentPage: (value) =>
    set(
      produce<IState>((state) => {
        state.currentPage = value;
      }),
    ),
  setItemsPerPage: (value) =>
    set(
      produce<IState>((state) => {
        state.itemsPerPage = value;
      }),
    ),
});

const useAppStore = create(devtools(reducer));

export default useAppStore;
