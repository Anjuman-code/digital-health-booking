import { useContext, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import SkeletonLoader from '../../components/SkeletonLoader';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors, isLoading } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  const DoctorSkeleton = () => (
    <div className="w-[220px] rounded-xl overflow-hidden border shadow-sm bg-white">
      <SkeletonLoader className="w-full h-[320px]" />
      <div className="p-4">
        <SkeletonLoader className="h-5 w-3/4 mb-2" />
        <SkeletonLoader className="h-4 w-1/2 mb-2" />
        <div className="flex items-center gap-2 mt-2">
          <SkeletonLoader className="h-4 w-4" />
          <SkeletonLoader className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Doctors</h1>
        <p className="text-gray-600 mb-6">
          Manage doctor profiles and their availability status
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading?.doctors ? (
            [...Array(8)].map((_, index) => <DoctorSkeleton key={index} />)
          ) : doctors.length > 0 ? (
            doctors.map((item, index) => (
              <div
                key={item._id || index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
              >
                {/* Image section */}
                <div className="w-full h-[320px] bg-[#EAEFFF] flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/placeholder-doctor.png';
                    }}
                  />
                </div>

                {/* Info section */}
                <div className="p-4 text-center">
                  <p className="text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.speciality}
                  </p>

                  {item.experience && (
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {item.experience} years experience
                    </p>
                  )}

                  {/* Availability toggle */}
                  <div className="mt-4 flex justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      disabled={isLoading?.changingAvailability}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    {isLoading?.changingAvailability && (
                      <LoadingSpinner size="sm" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        item.available ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg font-medium">No doctors found</p>
              <p className="text-gray-400 text-sm mt-2">
                Add doctors to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
