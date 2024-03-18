"use client"

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


const ScrollToUpButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)

        }

        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const ScrolltoUp = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
    }

    return (
        <button
            className={`fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            onClick={ScrolltoUp}
        >
            <div className="bg-violet-500 p-3 rounded transition-transform duration-300 transform-gpu hover:scale-110">
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </button>
    );
}

export default ScrollToUpButton