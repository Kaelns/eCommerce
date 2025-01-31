import type { JSX } from 'react';
import type { Settings } from 'react-slick';
import type { BoxProps } from '@mui/system';
import type { SxStyles, PropsWithChildren } from '@/shared/types/types';

import Slider from 'react-slick';
import { useRef, useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { LightMuiBox } from '@/components/boxes/LightMuiBox';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { sxMixins } from '@/shared/data/mui-mixins';

const sxStyles: SxStyles = {
  slider: {
    position: 'relative'
  },
  nextArrow: {
    right: '0',
    transform: 'translate(15%, -50%)'
  },
  prevArrow: {
    left: '0',
    transform: 'translate(-15%, -50%)'
  },
  arrowShared: (theme) => ({
    position: 'absolute',
    top: '50%',
    zIndex: 1000,

    [theme.breakpoints.down('laptop')]: {
      top: 'auto',
      bottom: '-90px'
    }
  }),
  dotsContainer: {
    display: 'flex',
    gap: 1,
    p: 1.5,
    overflowY: 'auto',
    '& li': {
      listStyle: 'none',
      textDecoration: 'none',
      borderBottom: '4px solid var(--mui-palette-info-light)',
      borderRadius: '2px',
      ...sxMixins.animation()
    },
    '& li.slick-active': {
      borderBottomColor: 'primary.dark'
    }
  }
};

const settings: Settings = {
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: (
    <LightMuiBox>
      <IconButton sx={[sxStyles.nextArrow, sxStyles.arrowShared]}>
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
    </LightMuiBox>
  ),
  prevArrow: (
    <LightMuiBox>
      <IconButton sx={[sxStyles.prevArrow, sxStyles.arrowShared]}>
        <ArrowBackIosNewIcon fontSize="large" />
      </IconButton>
    </LightMuiBox>
  )
};

const additionalSettings = (customDots: React.ReactNode[], sliderRef: React.RefObject<null | Slider>): Settings => ({
  customPaging(index: number): JSX.Element {
    const slideTo = (): void => sliderRef.current?.slickGoTo(index);
    return (
      <Box onClick={slideTo} className="slick__dot">
        {customDots[index]}
      </Box>
    );
  },
  appendDots(dots: React.ReactNode): JSX.Element {
    return <LightMuiBox sx={sxStyles.dotsContainer}>{dots}</LightMuiBox>;
  }
});

interface ImgCarouselProps extends BoxProps {
  arrows?: boolean;
  openModalImg?: number;
  customDots?: React.ReactNode[];
}

export function ImgCarousel({
  children,
  arrows = false,
  customDots = [],
  openModalImg = 0,
  width = 1,
  ...props
}: PropsWithChildren<ImgCarouselProps>): React.ReactNode {
  const sliderRef = useRef<Slider>(null);

  const addSettings = useMemo(() => (customDots.length ? additionalSettings(customDots, sliderRef) : {}), [customDots]);

  return (
    <Box
      component={Slider}
      ref={sliderRef}
      dots={!arrows}
      arrows={arrows}
      draggable={!arrows}
      initialSlide={openModalImg}
      {...settings}
      {...addSettings}
      sx={sxStyles.slider}
      width={width}
      {...props}
    >
      {children}
    </Box>
  );
}
