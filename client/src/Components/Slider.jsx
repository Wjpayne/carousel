/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";
import axios from "axios";

import { PhotoForm } from "./PhotoForm";

const getWidth = () => window.innerWidth;

/**
 * @function Slider
 */
const Slider = () => {
  //set state for adding photos

  const [newPhoto, setNewPhoto] = useState({ photo: "" });

  //set state for slides
  const [slides, setSlides] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  //functions to handle adding a photo

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const formData = new FormData();
      formData.append("photo", newPhoto.photo);

      const result = await axios.post(
        "http://localhost:5000/photo/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setNewPhoto(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoto = (e) => {
    setNewPhoto({ ...newPhoto, [e.target.name]: e.target.files[0] });
  };

  //get phots from database

  const loadPhotos = async () => {
    try {
      const result = await axios.get("http://localhost:5000/photo/get");

      setSlides(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [newPhoto]);

  //next and previous slides

  const nextSlide = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const activeImageSource = slides.slice(activeIndex, activeIndex + 3);

  const imagesToDisplay =
    activeImageSource.length < 3
      ? [...activeImageSource, ...slides.slice(0, 3 - activeImageSource)]
      : activeImageSource;

  return (
    <>
      <div css={SliderCSS}>
        <SliderContent width={getWidth() * slides.length }>
          {imagesToDisplay.map((slide, index) => (
            <Slide
              index={index}
              activeIndex={activeIndex}
              width={getWidth()}
              key={slide._id}
              id={slide._id}
            />
          ))}
        </SliderContent>

        <Arrow direction="left" handleClick={prevSlide} />
        <Arrow direction="right" handleClick={nextSlide} />

        <Dots slides={slides} activeSlide={activeIndex} />
      </div>
      <div>
        <PhotoForm handleSubmit={handleSubmit} handlePhoto={handlePhoto} />
      </div>
    </>
  );
};

const SliderCSS = css`
  position: relative;
  height: 600px;
  width: 600px;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

export default Slider;
