/* eslint-disable react/prop-types */
import { Earth } from "lucide-react"
import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import Lightbox from "yet-another-react-lightbox"
import { Photo } from "../../ui"

/* eslint-disable react/react-in-jsx-scope */
const AppAdvertiseCard = ({ title, description, cta }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const fullDescription = description || "demo";
    const [openPreviewImage, setOpenPreviewImage] = useState(false);

    const onOpenPreviewImage = () => {
        setOpenPreviewImage(!openPreviewImage);
    };

    const truncatedDescription = description.slice(0, 100) + '...';

    return (
        <>
            <div className="post w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <button
                    className="max-h-[87.5rem] -mt-3 object-cover w-full"
                    onClick={onOpenPreviewImage}
                >
                    <Photo
                        imageSrc="https://i.pinimg.com/736x/ba/2c/e9/ba2ce98bb464a025448c47fd5dfb6565.jpg"
                        link="#"
                        label="Product Image"
                        className="h-full object-cover w-full"
                    />
                </button>
                <div className="mt-3 flex flex-col gap-2">
                    <h2 className="font-bold text-4xl">{title}</h2>
                    <div className="flex items-center gap-2 text-lg">Sponsored <Earth size={15} /> </div>
                    <div className="text-2xl flex items-start flex-col mt-4 mb-2">
                        {
                            description.length < 100
                                ? <p>{description}</p>
                                : <>
                                    <p>{isExpanded ? fullDescription : truncatedDescription}</p>
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-blue-500 hover:text-blue-700 font-medium mt-2 focus:outline-none"
                                    >
                                        {isExpanded ? 'Show Less' : 'Read More'}
                                    </button>
                                </>
                        }
                    </div>
                    <button className="text-2xl w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200">
                        {cta}
                    </button>
                </div>
            </div>

            <Lightbox
                open={openPreviewImage}
                close={onOpenPreviewImage}
                slides={[{ src: "https://i.pinimg.com/736x/ba/2c/e9/ba2ce98bb464a025448c47fd5dfb6565.jpg" }]}
            />
        </>
    )
}

export default memo(AppAdvertiseCard, isEqual)
