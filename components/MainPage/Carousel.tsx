import { useState, useEffect } from 'react';
import CarouselComponent from './Helpers/CarouselComponent';

// Carousel with last images generated by users
export default function Carousel() {

  const [images, setImages] = useState(['']);
  const [captions, setCaptions] = useState(['']);
  const [recentCreations, setRecentCreations] = useState([{"image": "", "caption": ""}])

  const getImg = async () => {
    if(recentCreations.length <= 6) {
      // GET API to fetch 1 sample image, call 6 times
      for(let i = 0; i< 6; i++) {
        const response = await fetch('/api/db/getRandomImage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Get the MongoDB response as JSON
        const imgData = await response.json();

        // Get the information stored in JSON
        const sImage: string = imgData.result.image;
        const sCaption: string = imgData.result.caption;

        let updatedVal = { 
          image: sImage,
          caption: sCaption
        }
        // recentCreations.push(updatedVal);
        setRecentCreations(recentCreations => ({
          ...recentCreations,
          ...updatedVal
        }))

        // Push information into states
        images.push(sImage);
        captions.push(sCaption);

        // setImages(images => ({
        //   ...images,
        //   sImage
        // }))
        // setCaptions(captions => ({
        //   ...captions,
        //   sCaption
        // }))

        // console.log(recentCreations);
      }
    }
  };

  useEffect(() => {
    getImg(); 
  }), [];

  return (  
    <>
      <div className="container mx-auto mb-20 text-center">
        <p className="block text-base leading-relaxed text-slate-600 mb-2 font-bold">
          recent creations
        </p>
        <h2 className="block tracking-normal font-bold text-violet-600">
          inspiration is just one click away 
        </h2>
      </div>
      <div className="container mb-32 mt-5 mx-auto w-full overflow-hidden p-0 relative">
        <div className="w-full h-full absolute">
          <div
            className="w-1/5 h-full absolute z-50 left-0"
            style={{
              background:
                "linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%)"
            }}
          />
          <div
            className="w-1/5 h-full absolute z-50 right-0"
            style={{
              background:
                "linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0) 100%)"
            }}
          />
        </div>
        <div
          className="carousel-items flex items-center justify-center"
          style={{
            width: "fit-content",
            animation: 'carouselAnim 12s infinite alternate linear'
          }}
        >

          {(() => {
            let td = [];
            for (let i = 0; i < 6; i++) {
              td.push(<CarouselComponent key={String(i)} imgUrl={images[i]} imgCap={captions[i]} />);
            }
            return td;
          })()}
        </div>
      </div>
    </>
  )
} 