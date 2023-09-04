import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass={{}}
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
}
