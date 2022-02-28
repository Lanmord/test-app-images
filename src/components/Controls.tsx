import { useEffect, useRef } from 'react';
import IImage from '../interfaces/IImage';
import useAppStore from '../store/useAppStore';
import styles from './controls.module.scss';

function makeUniqArrayByField<TElement, TKey extends keyof TElement>(
  arr: TElement[],
  field: TKey,
): TElement[] {
  const uniqArr: TElement[] = [];
  const uniqKeys: any = {};

  for (let i = 0; i < arr.length; i++) {
    const itemField = arr[i][field];

    if (!uniqKeys[itemField]) {
      uniqKeys[itemField] = true;
      uniqArr.push(arr[i]);
    }
  }

  return uniqArr;
}

const Controls = () => {
  const { setImages, images, setFilteredImages, filteredImages, setCurrentPage } = useAppStore(
    (state) => state,
  );
  const filterRef = useRef<HTMLSelectElement>(null);

  const handlerSortOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const imagesCopy: IImage[] = JSON.parse(JSON.stringify(images));
    const filteredImagesCopy: IImage[] = JSON.parse(JSON.stringify(filteredImages));
    if (e.target.value === 'ASC') {
      setImages(imagesCopy.sort((a, b) => (a.albumId > b.albumId ? 1 : -1)));
      setFilteredImages(filteredImagesCopy.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } else {
      setImages(imagesCopy.sort((a, b) => (a.albumId < b.albumId ? 1 : -1)));
      setFilteredImages(filteredImagesCopy.sort((a, b) => (a.id < b.id ? 1 : -1)));
    }
  };

  const handlerFilterOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    if ('DEFAULT' === e.target.value) {
      setFilteredImages([]);
    } else {
      setFilteredImages(images.filter((item) => item.albumId === Number(e.target.value)));
    }
  };

  useEffect(() => {
    if (filteredImages.length === 0 && filterRef.current) {
      filterRef.current.value = 'DEFAULT';
    }
  }, [filteredImages]);

  return (
    <div className={styles.wrapper}>
      <span> Сортироват по:</span>
      <select
        style={{ marginRight: '20px' }}
        className={styles.select}
        onChange={(e) => handlerSortOnChange(e)}
        defaultValue={'ASC'}>
        <option value="ASC">По возростанию</option>
        <option value="DESC">По убыванию</option>
      </select>

      <span> Фильтрация по альбому:</span>
      <select
        ref={filterRef}
        className={styles.select}
        onChange={(e) => handlerFilterOnChange(e)}
        defaultValue={'DEFAULT'}>
        <option value="DEFAULT">Без фильтрации</option>

        {makeUniqArrayByField(images, 'albumId')
          .sort((a, b) => (a.albumId > b.albumId ? 1 : -1))
          .map((item, idx) => {
            for (let i = 0; i < images.length; i++) {
              return (
                <option key={idx} value={item.albumId}>
                  {item.albumId}
                </option>
              );
            }

            return null;
          })}
      </select>
    </div>
  );
};

export default Controls;
