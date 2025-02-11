
import Lottie from 'lottie-react';
import car from '../../public/car.json';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-32 h-32">
        <Lottie animationData={car} loop autoplay />
      </div>
      <p className="mt-4 text-xl font-semibold text-white">Loading...</p>
    </div>
  );
};

export default Spinner;