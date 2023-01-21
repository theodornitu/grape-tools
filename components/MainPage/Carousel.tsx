import { useState, useEffect } from 'react';
import CarouselComponent from './Helpers/CarouselComponent';

// Carousel with last images generated by users
export default function Carousel() {
 
  const [img0, setImg0] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');

  const [cap0, setCap0] = useState('');
  const [cap1, setCap1] = useState('');
  const [cap2, setCap2] = useState('');
  const [cap3, setCap3] = useState('');
  const [cap4, setCap4] = useState('');
  const [cap5, setCap5] = useState('');

  const getImg = async () => {
    // GET API to fetch last 6 generated images
    const response = await fetch('/api/db/getRecentImages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get the MongoDB response as JSON
    const imgData = await response.json();

    // console.log("imgData");
    // console.log(imgData.result[0]);
    // console.log(imgData.result);
    // console.log(imgData.result[0].requests[0].caption);
    // console.log("Image:");
    // console.log(imgData.result);

    var imgCheck: number = 0;

    for (let i = 0; i < 4; i++) {
      if(imgData.result[i] != null)
        imgCheck++;
    }

    if(imgCheck == 4) {
      // Set images and captions
      setImg0(imgData.result[0].requests[0].image);
      setImg1(imgData.result[1].requests[0].image);
      setImg2(imgData.result[2].requests[0].image);
      setImg3(imgData.result[3].requests[0].image);
      // setImg4(imgData.result[4].requests[0].image);
      // setImg5(imgData.result[5].requests[0].image);

      setCap0(imgData.result[0].requests[0].caption);
      setCap1(imgData.result[1].requests[0].caption);
      setCap2(imgData.result[2].requests[0].caption);
      setCap3(imgData.result[3].requests[0].caption);
      // setCap4(imgData.result[4].requests[0].caption);
      // setCap5(imgData.result[5].requests[0].caption);
    }
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <>
      <div onLoad={getImg} className="container mx-auto mb-20 text-center">
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
          <CarouselComponent imgUrl={img0} imgCap={cap0} />
          <CarouselComponent imgUrl={img1} imgCap={cap1} />
          <CarouselComponent imgUrl={img2} imgCap={cap2} />
          <CarouselComponent imgUrl={img3} imgCap={cap3} />
          <CarouselComponent imgUrl={img4} imgCap={cap4} />
          <CarouselComponent imgUrl={img5} imgCap={cap5} />
        </div>
      </div>
    </>
  )
}