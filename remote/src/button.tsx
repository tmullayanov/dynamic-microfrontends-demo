import React, { useCallback, useState } from "react";

export default () => {
    let callback = useCallback(() => {
        console.log('provider btn:: hello');
        setText(() => "Hello from provider");
    }, []);

    let [text, setText] = useState('');

    return <div style={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <button onClick={callback}>
            Provider button
        </button>
        {text}
    </div>
}