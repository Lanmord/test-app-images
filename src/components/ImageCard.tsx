import IImage from '../interfaces/IImage';
import useAppStore from '../store/useAppStore';
import styles from './imageCard.module.scss';

interface IProps extends IImage {
  handleOpenImage: (url: string) => void;
}

const ImageCard = ({ id, albumId, title, url, thumbnailUrl, handleOpenImage }: IProps) => {
  const { setImages, images, setFilteredImages, filteredImages } = useAppStore((state) => state);

  return (
    <div className={styles.item}>
      <div
        onClick={() => {
          setImages(images.filter((item) => item.id !== id));
          setFilteredImages(filteredImages.filter((item) => item.id !== id));
        }}>
        ❌
      </div>
      <img onClick={() => handleOpenImage(url)} src={thumbnailUrl} alt="" />
      <p>
        albumId: <strong>{albumId}</strong>
      </p>
      <p>
        title: <strong>{title}</strong>
      </p>
      <p>
        id: <strong> {id}</strong>
      </p>
    </div>
  );
};

export default ImageCard;
