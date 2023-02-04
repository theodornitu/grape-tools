import React from "react";

interface requests {
    imgUrl: string;
    imgCap: string;
}

function CarouselComponent(props: requests, key: string) {
    const bgAsUrl = "url('" + props.imgUrl + "')";
    // console.log(props.imgUrl);
    // console.log(props.imgCap);
    return (
        <>
        {(props.imgUrl != '' ) ? (
            <div
                key={props.imgUrl}
                className="carousel-focus flex items-center justify-end flex-col relative bg-white mx-5 p-4 mb-4 overflow-hidden rounded-2xl shadow-soft-md"
                style={{ 
                    width: 300,
                    height: 300,
                    backgroundImage: bgAsUrl,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                >
                <div className="mt-3 mb-0 p-3 text-white text-3 backdrop-blur-md rounded-lg border border-white/20 bg-black/10 w-full">
                {/* {(props.imgCap != '' ) ? (
                    props.imgCap.slice(0,43) + ((props.imgCap.length > 40) ? ("...") : (""))
                ) : ( */}
                {props.imgCap}
                {/* )
                } */}
                </div>
            </div>
        ) : (
            <></>
        )}
        </>
    );
};

export default CarouselComponent;