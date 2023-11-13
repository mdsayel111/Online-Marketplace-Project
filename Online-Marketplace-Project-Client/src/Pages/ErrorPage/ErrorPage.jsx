import Lottie from 'lottie-react';
import error from "../../AnimationJson/404.json"
import React from 'react';

const ErrorPage = () => {
    return (
        <div className='w-[80%] h-[50vh] -mt-20 mx-auto'>
            <Lottie className='h-[85vh]' animationData={error} loop={true}></Lottie>
        </div>
    );
};

export default ErrorPage;