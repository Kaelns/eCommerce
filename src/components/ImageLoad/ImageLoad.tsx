import { Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { ImgSkeleton } from '@/components/ImgSkeleton/ImgSkeleton';
import { IImageLoadProps } from '@/components/ImageLoad/ImageLoad.interface';

import styles from './ImageLoad.module.scss';

export function ImageLoad({ src, alt, className = '', imgStyles = '', onClick }: IImageLoadProps): React.ReactNode {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const ref = useRef<HTMLImageElement>();

  const handleOnImgLoad = (): void => {
    setIsImgLoading(false);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      handleOnImgLoad();
    }
  });

  return (
    <Box className={`${className} ${styles.imgWrapper}`}>
      <ImgSkeleton className={`${styles.skeleton} ${isImgLoading ? '' : styles.disabled}`} />
      <Box
        ref={ref}
        component="img"
        src={src}
        alt={alt}
        className={`${imgStyles} ${styles.img}`}
        onLoad={handleOnImgLoad}
        onClick={onClick}
        loading="lazy"
      />
    </Box>
  );
}
