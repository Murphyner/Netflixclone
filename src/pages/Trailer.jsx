import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useMoviesVideoQuery } from '../store/tmdbApi';

function Trailer() {
    const { id } = useParams(); // Get the ID from the URL
    const {data} = useMoviesVideoQuery(id)
    const[videoId , setVideoId] = useState(null)

    useEffect(() => {
        data?.results?.slice(0 , 1).map(item => setVideoId(item.id) )
        
    }, [data])


    const onVideoReady = (event) => {
        event.target.pauseVideo(); // Optional: Pause the video initially
    };

    const videoOptions = {
        playerVars: {
            autoplay: 1, // Auto-play the video
        },
    };

    return (
        <div className="h-screen w-full bg-bg-custom flex justify-center items-center">
            <YouTube
                videoId={videoId} // Use the ID from the URL
                opts={{
                    height: '100%',
                    width: '100%',
                }}
                onReady={onVideoReady}
                className="w-full h-full"
            />
        </div>
    );
}

export default Trailer;
