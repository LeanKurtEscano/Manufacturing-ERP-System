
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menuItems } from '../constants/render';
import { Link } from 'react-router-dom';
import { faBars, faChartLine, faSignOutAlt, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Modal from '../components/Modal';


import { useProfile } from '../contexts/ProfileContext';
import { userAuthApi } from '../config/apiConfig';
const Sidebar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { setIsAuthenticated, toggleLog, setToggleLog, toggle, setToggle} = useProfile();

   
    
    // @ts-ignore
    const [toggleDboard, setToggleDboard] = useState(false);
    // @ts-ignore
    const toggleDash: React.MouseEventHandler<HTMLDivElement> = () => {
        setToggleDboard((prevState) => !prevState);
    };

    const handleLogout = (index: number) => {
        setToggleLog(true);
        setActiveIndex(index);
    };

    const navigate = useNavigate();

    const toUserProfile = () => {
        navigate('/dashboard/analytics');
        setActiveIndex(10);
    };

    const handleMenuClick = (index: number) => {
        const selectedPath = menuItems[index]?.url;
        setActiveIndex(index);

        // Navigate if the path exists
        if (selectedPath) {
            navigate(selectedPath);
            localStorage.setItem("currentPath", selectedPath);
            setActiveIndex(index);
        }
    };

    const adminLogout = async () => {
        try {
            const response = await userAuthApi.post('/logout', {refreshToken: localStorage.getItem("refresh_token")});

            if (response?.status === 200) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate('/');
                setIsAuthenticated(false);
                setToggleLog(false);
            }
        } catch (error) {
            alert("Something Went Wrong")
        }
    }

    const handleClose = () => {
        setToggleLog(false);
        setActiveIndex(null);
    };

    const showSideBar = () => {
        setToggle(!toggle);
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-full transition-all bg-white duration-700 z-50 bg-cardbg shadow-xl
    ${toggle ? 'w-16' : 'w-56'}`}
        >
            <div className='flex justify-center align-center absolute pl-3 pt-3'>
                <button onClick={showSideBar} className='w-4 cursor-pointer'>
                    <FontAwesomeIcon icon={toggle ? faBars : faTimes} className='text-blue-500' />
                </button>
            </div>

            {/* Improved Admin Profile Section with better transitions */}
            <div className="pt-10 px-2 mb-1">
                <div 
                    className="cursor-pointer relative"
                    onClick={toUserProfile}
                >
                    <div className="bg-blue-50 pl-2.5 rounded-lg border border-blue-100 shadow-sm p-1.5 flex items-center">
                        <div className="bg-blue-500 rounded-full h-7 w-7 min-w-7 flex items-center justify-center text-white">
                            <FontAwesomeIcon icon={faUser} className="text-xs" />
                        </div>
                        <div className={`absolute left-10 transition-opacity duration-700 ${toggle ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                            <p className="font-medium text-xs text-blue-800 whitespace-nowrap">Hello Admin!</p>
                            <p className="text-[10px]  text-gray-600 whitespace-nowrap">Loan Management System</p>
                        </div>
                        {/* AdminNotificationBell positioned in the top right of the profile section */}
                        {/* AdminNotificationBell positioned on the right side */}
                        <div className={`ml-auto pb-1.5 px-0.5  transition-opacity duration-700 ${toggle ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                            
                        </div>
                    </div>
                </div>
            </div>
            <nav className='h-auto flex flex-col justify-center p-3 items-center pb-16'>

                <div className='pl-2 w-full'>
                    <p className={`text-gray-700 text-[13px] mb-1 ${toggle ? 'opacity-0' : 'opacity-100'}`}> Insight</p>
                </div>

                <div
                    onClick={() => handleMenuClick(10)}
                    className={`flex flex-row items-center w-full h-9 p-3 mb-2 transition-all duration-500 rounded-md
          ${activeIndex === 10 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white group'}
          ${toggle ? 'w-full h-9 pr-6' : ''}`}
                >
                    <div className='mr-0'>
                        <Link to={'/dashboard/analytics'}>
                            <FontAwesomeIcon
                                icon={faChartLine}
                                className={`transition-colors duration-300 text-sm
                ${activeIndex === 10 ? 'text-white' : 'text-blue-500 group-hover:text-white'}`}
                            />
                        </Link>
                    </div>

                    <div
                        className={`flex justify-center items-center w-full pr-4 overflow-hidden  
            ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}
                    >
                        <p
                            className={`pl-2 duration-500 whitespace-nowrap transition-opacity text-sm
              ${activeIndex === 10 ? 'text-white' : ' group-hover:text-white'}`}
                        >
                            <Link to={'/dashboard/analytics'}>Dashboard</Link>
                        </p>
                    </div>
                </div>


                <div className='pl-2 w-full'>
                    <p className={`text-gray-700 text-[13px] mb-1 ${toggle ? 'opacity-0' : 'opacity-100'}`}> Operations</p>
                </div>


                {
                    menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => (item.text === "Logout" ? handleLogout(index) : handleMenuClick(index))}
                            className={`flex flex-row cursor-pointer items-center w-full h-9 p-3 mb-2 transition-all duration-500 rounded-md
            ${activeIndex === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white group'}
            ${toggle ? 'w-full h-9 pr-6' : ''}`}
                        >
                            <div className='mr-0'>
                                {item.text !== "Logout" ? (
                                    <Link to={item.url ?? "/"}>
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className={`transition-colors duration-300 text-sm
                  ${activeIndex === index ? '' : ' text-blue-500 group-hover:text-white'}`}
                                        />
                                    </Link>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="pl-1 text-blue-500 group-hover:text-white text-sm"
                                    />
                                )}
                            </div>

                            <div
                                className={`flex justify-center items-center w-full pr-4 overflow-hidden  
              ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}
                            >
                                <p
                                    className={`pl-2 duration-500 whitespace-nowrap transition-opacity text-sm
                ${activeIndex === index ? 'text-white' : ' group-hover:text-white'}`}
                                >
                                    {item.text !== "Logout" ? (
                                        <Link to={item.url ?? "/"}>{item.text}</Link>
                                    ) : (
                                        <span className="cursor-pointer">Logout</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </nav>

            {toggleLog && (
                <Modal
                    isOpen={toggleLog}
                    title="Confirm Logout"
                    message="Are you sure you want to logout?"
                    onClose={handleClose}
                    onConfirm={adminLogout}
                />
            )}
        </aside>
    );
};

export default Sidebar;