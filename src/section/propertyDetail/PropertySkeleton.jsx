import React from "react";

const PropertySkeleton = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* HERO SECTION */}
        <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-200" />

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <SkeletonCard>
              <div className="h-4 bg-gray-200 w-3/4 mb-4 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </SkeletonCard>

            {/* Stats */}
            <SkeletonCard>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-gray-200 w-2/3 rounded"></div>
                      <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>

            {/* Amenities */}
            <SkeletonCard>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-md w-full"
                  ></div>
                ))}
              </div>
            </SkeletonCard>

            {/* Legal Documents */}
            <SkeletonCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <SkeletonCard>
              <div className="space-y-3 text-center">
                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded"></div>
                <div className="h-9 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-9 w-full bg-gray-200 rounded-lg"></div>
              </div>
            </SkeletonCard>

            {/* Highlights */}
            <SkeletonCard>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-5/6"></div>
                ))}
              </div>
            </SkeletonCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// Subcomponent
const SkeletonCard = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">{children}</div>
);

export default PropertySkeleton;
