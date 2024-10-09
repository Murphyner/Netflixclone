import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="relative group rounded-md overflow-hidden bg-neutral-800 animate-pulse h-36 w-full">
            <div className="h-full w-full bg-neutral-800" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="bg-neutral-800 h-4 w-3/4 rounded mb-2" />
                <div className="bg-neutral-800 h-3 w-1/2 rounded" />
            </div>
        </div>
    );
};

export default SkeletonCard;
