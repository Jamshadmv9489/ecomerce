import { ClipLoader } from "react-spinners";

const Loader = ({ message = "Please wait..." }) => {
    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-[2px] rounded-lg text-center">
            <ClipLoader color="#36d7b7" size={50} />
            <p className="mt-4 text-slate-600 font-medium text-sm">{message}</p>
        </div>
    );
};

export default Loader;