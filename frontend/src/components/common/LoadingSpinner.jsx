import { BarLoader } from "react-spinners";

const LoadingSpinner = ({message = "Loading..."}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <BarLoader color="#36d7b7" width={100} height={4} />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}

export default LoadingSpinner;