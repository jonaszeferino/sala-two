import React, { useState, useEffect } from 'react';
import { Flex, IconButton, Box, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const YoutubeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/social');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
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
  }, [currentIndex, videos]);

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
          {videos.length > 0 && (
            videos.map((video, index) => (
              <Box key={video.id} flex="0 0 100%" p={0} display={index === currentIndex ? 'block' : 'none'}>
                <iframe
                  width="100%"
                  height="500px"
                  src={video.link}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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

export default YoutubeCarousel;
