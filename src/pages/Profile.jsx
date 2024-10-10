import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    const [username, setUsername] = useState('Rami');
    const [selectedAvatar, setSelectedAvatar] = useState('/path-to-avatar.png'); // Replace with actual image path
    const [language, setLanguage] = useState('English');
    const [gameHandle, setGameHandle] = useState('');
    const [maturitySetting, setMaturitySetting] = useState('All Maturity Ratings');

    const handleSave = () => {
        alert('Profile saved successfully!');
    };

    return (
        <div className='min-h-screen w-full  text-white p-8'
            style={{
                backgroundImage: `linear-gradient(to top , black, #111111)`
            }}>
            <div className='max-w-[600px] mx-auto'>
                <h2 className='text-2xl md:text-4xl w-full border-b-[1px] border-white border-opacity-20 pb-1 md:pb-3 font-bold mb-6'>Edit Profile</h2>
                <div className='flex w-full gap-5'>
                   
                        <img
                            src='/assets/images/Character5.webp'
                            alt="Profile Avatar"
                            className='w-20 h-24 md:w-28 md:h-32 bg-red-600 rounded cursor-pointer'
                            onClick={() => alert('Choose a new avatar')}
                        />
                    <div>
                        <div className='mb-6'>

                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-full bg-neutral-800 text-lg px-4 py-1  outline-none'
                            />
                        </div>

                        {/* Language Selection */}
                        <div className='mb-6'>
                            <label className='block text-lg mb-2'>Language:</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className='px-4  border-white border-[1px] bg-black  text-white outline-none'
                            >
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>

                        {/* Game Handle */}
                        <div className='mb-6 border-b-[1px] border-white border-opacity-20 pb-6'>
                            <label className='block text-lg mb-2'>Game Handle:</label>
                            <p className='text-sm text-gray-400 my-2'>
                                Your handle is a unique name that'll be used for playing with other Netflix members across all Netflix Games. <a href='#' className='underline'>Learn more</a>
                            </p>
                            <input
                                type='text'
                                value={gameHandle}
                                onChange={(e) => setGameHandle(e.target.value)}
                                placeholder='Create Game Handle'
                                className='w-full bg-neutral-800 px-4 py-1 text-white outline-none'
                            />
                        </div>

                        {/* Maturity Settings */}
                        <div className='mb-6 border-b-[1px] border-white border-opacity-20 pb-6'>
                            <label className='block text-lg mb-2'>Maturity Settings:</label>
                            <div className='flex items-center'>
                                <button
                                    className={`px-4 py-1 text-sm ${maturitySetting === 'All Maturity Ratings' ? 'bg-neutral-800' : 'bg-neutral-900'}`}
                                    onClick={() => setMaturitySetting('All Maturity Ratings')}
                                >
                                    All Maturity Ratings
                                </button>
                            </div>
                            <p className='text-sm text-gray-400 mt-2'>
                                Show titles of all maturity ratings for this profile.
                            </p>
                        </div>

                    </div>
                </div>

                <div className='flex justify-end gap-3 text-sm md:text-base'>
                    <button
                        className='bg-white px-4 md:px-8 py-1 md:py-2  text-black tracking-wider font-semibold transition-colors'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <Link
                        to={'/'}
                        className='px-4 md:px-8 py-1 md:py-2 border-[1px] border-white tracking-wider font-semibold transition-colors'
                        onClick={handleSave}
                    >
                        Home
                    </Link>
                    <button
                        className='px-4 md:px-8 py-1 md:py-2 border-[1px] border-white tracking-wider font-semibold transition-colors'
                        onClick={handleSave}
                    >
                        Log Out
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default Profile;
