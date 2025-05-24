'use client';
import {useState, useRef, useEffect} from "react";

export default function CollapseComponent({ title, children }) {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen, children]);

    return (
        <div className="collapse-container">
            <button className={`collapse-button position-relative ${isOpen ? 'opened' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {title}
            </button>
            <div ref={contentRef} className="collapse-content" style={{ maxHeight }}>
                <div style={{ padding: isOpen ? '10px' : '0 10px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
