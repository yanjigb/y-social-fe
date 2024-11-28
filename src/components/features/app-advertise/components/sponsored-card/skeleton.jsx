/* eslint-disable react/react-in-jsx-scope */
export default function Skeleton() {
    return (
        <div className="post w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out animate-pulse">
            <div className="h-60 bg-gray-200"></div>
            <div className="mt-3 flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="text-2xl flex items-start flex-col gap-2 mt-4 mb-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
