import React, { useEffect, useState } from 'react';

function Touch({ x, y, isEnded = false }) {
    const initialClassName = isEnded ? 'touch' : 'touch touch-start';
    const [className, setClassName] = useState(initialClassName);
    const style = { top: y, left: x };

    useEffect(() => {
        if (className === 'touch touch-start') {
            requestAnimationFrame(() => {
                setClassName('touch');
                // thus, I have to use a State for the Class name.
            });
        } else if (className === 'touch' && isEnded) {
            requestAnimationFrame(() => setClassName('touch touch-end'));
        }
    });

    return (
        <div className={className} style={style}></div>
    );
}

function TouchPad({ children }) {

    const [touches, setTouches] = useState([]);

    function onTouchStart({ changedTouches }) {
        const newTouches = [];
        for (let i = 0; i < changedTouches.length; i++) {
            const { identifier, pageX, pageY } = changedTouches[i];
            newTouches.push({
                id: identifier,
                x: pageX,
                y: pageY,
                isEnded: false,
            });
        }
        setTouches([...touches, ...newTouches]);
    }

    function onTouchEnd({ changedTouches }) {
        const endedTouchIds = [];
        for (let i = 0; i < changedTouches.length; i++) {
            const { identifier } = changedTouches[i];
            endedTouchIds.push(identifier);
        }
        setTouches(touches.map((touch) => {
            if (endedTouchIds.includes(touch.id)) {
                return ({
                    ...touch,
                    id: null,
                    isEnded: true,
                });
            }
            return touch;
        }));
    }

    return (
        <div className={'ripple-container'} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {touches.map((touch, i) => <Touch {...touch} key={i} />)}
            {children}
        </div>
    );
}

export default TouchPad;
