import React, { useEffect, useLayoutEffect } from "react";

export const Widget = () => {
    useLayoutEffect(() => {
        console.log('Mounting widget...');
    }, []);

    return <div style={{ backgroundColor: 'red', border: '1px solid black' }}>
        <p>This is embeddable widget that can be loaded via Module Federation</p>
    </div>
}