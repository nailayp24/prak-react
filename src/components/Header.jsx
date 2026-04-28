import { useState, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    return (
        <div id="header-container">
            <div id="search-bar" className="cursor-pointer">
                <input id="search-input" type="text" placeholder="Search Here..." readOnly />
                <FaSearch id="search-icon" />
            </div>

            <div id="icons-container">
                <div id="notification-icon">
                    <FaBell />
                    <span id="notification-badge">50</span>
                </div>
                <div id="chart-icon"><FcAreaChart /></div>
                <div id="settings-icon"><SlSettings /></div>

                <div id="profile-container">
                    <span id="profile-text">
                        {greeting}, <b>Naila Yohanda Putri</b>
                    </span>
                    <img id="profile-avatar" src="/img/naila.jpeg" alt="Profile" />
                </div>
            </div>
        </div>
    );
}