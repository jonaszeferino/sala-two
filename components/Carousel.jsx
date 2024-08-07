import React, { useState, useEffect } from 'react';
import { Flex, IconButton, Image, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://rurvpgvvyestximvtvfp.supabase.co/storage/v1/object/public/images/desketop_banner_2.webp',
    'https://rurvpgvvyestximvtvfp.supabase.co/storage/v1/object/public/images/desktop_banner_1.webp',
    'https://rurvpgvvyestximvtvfp.supabase.co/storage/v1/object/public/images/desktop_banner_3.webp'
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = setTimeout(() => {
        nextSlide();
      }, 10000);
    };

    const stopTimer = () => {
      clearTimeout(timerId);
    };

    startTimer();

    return () => {
      stopTimer();
    };
  }, [currentIndex, images]);

  return (
    <Flex alignItems="center" justifyContent="center" w="100%" maxW="1200px" mx="auto" position="relative">
      <IconButton
        aria-label="Previous Slide"
        icon={<ChevronLeftIcon />}
        onClick={prevSlide}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        fontSize="40px"
      />
      <Box w="100%">
        <Flex overflow="hidden" borderRadius={20}>
          {images.length > 0 && (
            images.map((image, index) => (
              <Box key={index} flex="0 0 100%" p={0} display={index === currentIndex ? 'block' : 'none'}>
                <Image
                  src={image}
                  w="100%"
                  h="500px"
                  alt={`Image ${index + 1}`}
                  cursor="pointer"
                  onClick={() => window.open(image, '_blank')}
                  style={{ opacity: index === currentIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                />
              </Box>
            ))
          )}
        </Flex>
      </Box>
      <IconButton
        aria-label="Next Slide"
        icon={<ChevronRightIcon />}
        onClick={nextSlide}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        fontSize="40px"
      />
    </Flex>
  );
};

export default Carousel;
