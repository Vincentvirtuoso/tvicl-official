import { LuHouse, LuRefreshCw, LuSearchX } from "react-icons/lu";

const NoPropertyData = ({ message, onRetry }) => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <LuSearchX className="text-4xl text-gray-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Property Data Unavailable
        </h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          {message ||
            "We couldn’t find the property details. Please try again or return to listings."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            <LuRefreshCw /> Try Again
          </button>
          <a
            href="/properties"
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <LuHouse /> Back to Listings
          </a>
        </div>
      </div>
    </section>
  );
};

export default NoPropertyData;
