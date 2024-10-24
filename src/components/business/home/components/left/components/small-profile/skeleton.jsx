/* eslint-disable react/react-in-jsx-scope */
export default function Skeleton() {
    return (
        <div className="animate-pulse profile">
            <div className="flex items-center h-12">
                <div className="w-16 flex-shrink-0 h-16 rounded-full bg-gray-200" />
                <div className="ml-2 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
                </div>
            </div>
        </div>
    )
}
