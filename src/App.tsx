import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './app.module.scss';

import { AnimatePresence } from 'framer-motion';
import Modal from './components/Modal';
import IImage from './interfaces/IImage';
import ImageCard from './components/ImageCard';
import useAppStore from './store/useAppStore';
import Pagination from './components/Pagination';
import Controls from './components/Controls';

const App: React.FC = () => {
  const { setImages, itemsPerPage, currentPage, images, filteredImages } = useAppStore(
    (state) => state,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageToOpen, setImageToOpen] = useState<string>('');

  const [currentImages, setCurrentImages] = useState<IImage[] | null>(null);

  const handleOpenImage = (url: string) => {
    setModalOpen(true);
    setImageToOpen(url);
  };

  useEffect(() => {
    axios.get<IImage[]>('http://jsonplaceholder.typicode.com/photos').then(({ data }) => {
      setIsLoading(false);

      setImages(data);
      setCurrentImages(data.slice(0, itemsPerPage - 1));
    });
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    if (filteredImages.length !== 0)
      setCurrentImages(filteredImages.slice(offset, offset + itemsPerPage));
    else setCurrentImages(images.slice(offset, offset + itemsPerPage));
  }, [currentPage, images, filteredImages]);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <>
      <div className={styles.wrapper}>
        <Controls />
        <div className={styles.list}>
          {currentImages &&
            currentImages.map((item: IImage, idx: number) => (
              <ImageCard key={idx} {...item} handleOpenImage={handleOpenImage} />
            ))}
        </div>
        <Pagination />
      </div>
      <AnimatePresence exitBeforeEnter={true}>
        {modalOpen && (
          <Modal handleClose={() => setModalOpen(false)}>
            <img src={imageToOpen} alt="" />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
