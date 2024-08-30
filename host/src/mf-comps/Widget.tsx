import React, { Suspense, useMemo, useState } from "react";
import { WidgetMFLoader } from "./MFLoader";

// might be injected from context or as a prop.
// I left it this way for the sake of simplicity of the example.
const loader = new WidgetMFLoader();

export const Widget = () => {

    const [url, setUrl] = useState('');
    const urlReady = useMemo(() => url === '', [url]);
    const [Component, setComponent] = useState<React.FC | null>(null);

    const loadUrl = async () => {
        const url = await getUrl();
        setUrl(url);
        loader.registerWidgetRemote('provider_2', url);
    }
    const loadComp = async () => {
        const widget = loader.loadWidgetModule();
        setComponent(widget);
    }

    return <>
        <button onClick={loadUrl} disabled={!urlReady}>
            Load url for Widget component
        </button>
        <button onClick={loadComp} disabled={urlReady}>
            Load component and render it
        </button>
        <div style={{marginTop: '2em'}}>
            <Suspense fallback="Loading...">
                {Component ? <Component /> : null}
            </Suspense>
        </div>
    </>
}

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// эмуляция fetch, который получает ссылку на микрофронтенд из внешнего источника
const getUrl = async () => {
    await timeout(fakeData.timeoutMs);
    return fakeData.url;
}

const fakeData = {
    url: 'http://localhost:4003/remoteEntry.js',
    timeoutMs: 1000
};

