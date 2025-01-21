import type { StackProps, SxProps, Theme } from '@mui/system';

interface ICreateImagesStyles<T extends StackProps['height'] = StackProps['height']> {
  imgHeight?: T extends number ? { height: T } : { height: T; maxSize: number | 'unlimited' };
  imgStyles?: SxProps<Theme>;
  containerStyles?: SxProps<Theme>;
}

interface ICreateImagesProps<T extends StackProps['height']> {
  key: string;
  styles: ICreateImagesStyles<T>;
  onClick?: (num: number) => () => void;
}

export function CreateImages<T extends StackProps['height'] = StackProps['height']>({ key, styles, onClick }: ICreateImagesProps<T>) {
  const { imgHeight, imgStyles = {}, containerStyles = {} } = styles;
  const maxSize = imgHeight && 'maxSize' in imgHeight ? imgHeight.maxSize : undefined;
  // FIXME redux fetch product by key and then convert in to light product
  //
  // const productData = key
  // return productData.images.map((imageData, index) => (
  //   <ImgLoad
  //     key={imageData.url}
  //     src={imageData.url}
  //     alt={productData.name}
  //     height={imgHeight?.height}
  //     sx={imgStyles}
  //     containerStyles={[sxStyles.imgContainer, ...convertSxToArr(containerStyles)]}
  //     srcset={{ srcSetArr: SRCSET_API, maxSize }}
  //     onClick={onClick ? onClick(index) : undefined}
  //   />
  // ));
}
