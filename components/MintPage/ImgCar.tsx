import React from "react";

interface requests {
    imgUrl: string;
    imgCap: string;
}

function ImgCar(props: requests) {
    const bgAsUrl = "url('" + props.imgUrl + "')";

    return (
        <div
            key={props.imgUrl}
            className="carousel-focus flex items-center justify-end flex-col relative bg-white mx-5 p-4 mb-4 overflow-hidden rounded-2xl shadow-soft-lg"
            style={{ 
                width: 300,
                height: 300,
                backgroundImage: bgAsUrl,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
            >
            <div className="mt-3 mb-0 p-3 text-white font-semibold backdrop-blur-md rounded-lg border border-white/20 bg-white/10 w-full">
                {props.imgCap}
            </div>
        </div>
    );
};

export default ImgCar;