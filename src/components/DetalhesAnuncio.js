import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";

const DetalhesAnuncio = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchListingById = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/listings/${id}`, {
                    credentials: 'include'
                });

                

                const data = await response.json();
                setListing(data);
                setCurrentImageIndex(0);
            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 404) {
                    console.log('Anuncio not found');
                } else {
                    console.log('Failed to fetch anuncio');
                }
            }
        };

        fetchListingById();
    }, [id]);

    
    const handlePrevImage = () => {
        if (listing && listing.media && listing.media.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.media.length) % listing.media.length);
        }
    };
    
    const handleNextImage = () => {
        if (listing && listing.media && listing.media.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.media.length);
        }
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    if (!listing) return <div>Loading...</div>;
    const { title, description, rent, rooms, location, status, media } = listing;
  
    return (
        <div className='flex xs:flex-col sm:flex-col md:flex-col lg:flex-row flex-col lg:gap-5'>
            <div className='sm:w-full md:w-full lg:w-8/12 lg:py-5 lg:pl-5 flex flex-col gap-2 md:gap-5'>
                <div className='bg-neutral-100 md:rounded-lg h-3/5 md:h-[600px] md:p-5'>
                    {media && media.length > 0 && (
                        <div className='relative h-full'>
                            <a href={`${process.env.REACT_APP_R2_PUBLIC}/${media}`}>
                                <img src={`${process.env.REACT_APP_R2_PUBLIC}/${media[currentImageIndex]}`} className=' w-full h-full object-cover md:rounded-md'/>
                            </a>
                            <button
                                className="absolute top-1/2 text-4xl md:text-8xl transform -translate-y-1/2 opacity-75 text-white focus:outline-none hover:opacity-100"
                                onClick={handlePrevImage}
                            >
                                <MdNavigateBefore/>
                            </button>
                            <button
                                className="absolute top-1/2 right-2 text-4xl md:text-8xl transform -translate-y-1/2 opacity-75 text-white focus:outline-none hover:opacity-100"
                                onClick={handleNextImage}
                            >
                                <MdNavigateNext />
                            </button>
                        </div>
                    )}
                </div>
                {media && media.length > 0 && ( 
                    <div ref={galleryRef} className='flex gap-2 overflow-x-auto bg-neutral-100 rounded-lg bg-neutral-100'>
                        {media.map((image, index) => (
                            <div key={index} className='w-28 h-28 flex-shrink-0 cursor-pointer' onClick={() => handleThumbnailClick(index)}>
                                
                                    <img src={`${process.env.REACT_APP_R2_PUBLIC}/${image}`} className='w-full h-full object-cover' />
                
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className='py-5 lg:py-5 lg:pr-5 w-full lg:w-4/12 '>
                <div className='lg:rounded-lg p-5 flex flex-col gap-3 bg-neutral-100 h-full'>
                    <div className='flex justify-between'>
                        <div className='text-2xl md:text-3xl'>{title}</div>
                        <div className='text-xl md:text-3xl font-bold'>{rent} €</div>
                    </div>
                    <div className='flex items-center gap-1 text-xl text-indigo-500'>
                        <div><FaLocationDot /></div>
                        <a href={location} target="_blank" rel="noopener noreferrer">{location}</a>
                    </div>

                    <div className='flex gap-3'>
                        <div className="uppercase inline-block pt-1 px-1 rounded-md bg-indigo-400 text-white text-sm font-bold tracking-widest">
                            {rooms}
                        </div>                        
                        <div className={`uppercase inline-block font-bold rounded-md text-sm py-1 px-1.5 ${status === 'available' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {status === 'available' ? 'Disponível' : 'Indisponível'}
                        </div>                    
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-medium lg:text-xl mb-1 tracking-wide title-font">DESCRIÇÃO</h3>
                        <div className="text-gray-900 font-normal whitespace-pre-wrap">{description}</div>
                    </div>
                </div>
            </div>
        </div>      
  )
}

export default DetalhesAnuncio
