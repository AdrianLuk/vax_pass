import { useEffect, useState } from "react";

export const useSwipe = () => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [direction, setDirection] = useState("none");
    const [touchStarted, setTouchStarted] = useState(false);
    const [isValidSwipe, setIsValidSwipe] = useState(false);
    const threshold = 30;
    const touchStart = (e: TouchEvent) => {
        const touchObj = e.touches[0];
        setIsValidSwipe(false);
        setTouchStarted(true);
        setStartX(touchObj.clientX);
        setStartY(touchObj.clientY);
    };
    const touchMove = (e: TouchEvent) => {
        const touchObj = e.touches[0];
        setCurrentX(touchObj.clientX);
        setCurrentY(touchObj.clientY);
    };
    const touchEnd = (e: TouchEvent) => {
        if (
            Math.abs(startX - currentX) >= threshold &&
            Math.abs(startY - currentY) < threshold
        ) {
            setDirection(startX > currentX ? "left" : "right");
            setIsValidSwipe(true);
        } else {
            setDirection(direction);
        }
        setStartX(0);
        setStartY(0);
        setCurrentX(0);
        setCurrentY(0);
        setTouchStarted(false);
    };
    useEffect(() => {
        window.addEventListener("touchstart", touchStart);
        window.addEventListener("touchmove", touchMove);
        window.addEventListener("touchend", touchEnd);
        return () => {
            window.removeEventListener("touchstart", touchStart);
            window.removeEventListener("touchmove", touchMove);
            window.removeEventListener("touchend", touchEnd);
        };
    });
    return { direction, touchStarted, isValidSwipe };
};