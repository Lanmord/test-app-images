import IImage from './IImage';

export default interface IState {
  images: IImage[];
  filteredImages: IImage[];
  currentPage: number;
  itemsPerPage: number;
  setImages: (value: IImage[]) => void;
  setFilteredImages: (value: IImage[]) => void;
  setCurrentPage: (value: number) => void;
  setItemsPerPage: (value: number) => void;
}
