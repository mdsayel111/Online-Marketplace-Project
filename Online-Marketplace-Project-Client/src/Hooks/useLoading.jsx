import Loading from "../AnimationJson/Loading.json";
import Lottie from "lottie-react";

const useLoading = () => {
    return (
        <Lottie animationData={Loading} />
    );
};

export default useLoading;