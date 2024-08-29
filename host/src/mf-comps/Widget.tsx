import { loadRemote, registerRemotes } from "@module-federation/enhanced/runtime";
import React, { Suspense, useMemo, useState } from "react";

export const Widget = () => {

    const [url, setUrl] = useState('');
    const urlReady = useMemo(() => url === '', [url]);
    const [Component, setComponent] = useState<React.FC | null>(null);

    const loadUrl = async () => {
        const url = await getUrl();
        setUrl(url);
        registerRemotes([{
            name: 'provider_2',
            entry: url
        }]);
    }
    const loadComp = async () => {
        // если контейнер и встраиваемый компонент активно используют хуки, может понадобиться оборачивание 
        // загрузки в React.lazy.
        // React.lazy рассчитывает на то, что компонент будет экспортирован как дефолтный.
        // Если он не экспоритруется как дефолтный, придется преобразовать результат loadRemote. 
        const remote = React.lazy(
            () => loadRemote<{Widget: React.FC}>(`provider_2/widget`)
                .then(md => md 
                    ? ({default: md.Widget}) 
                    : Promise.reject()));
        setComponent(remote ?? null);
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

