import React, { useCallback } from "react";

export default () => {
    let callback = useCallback(() => {
        console.log('provider btn:: hello');
    }, []);

    return <button onClick={callback}>
        Provider button
    </button>
}