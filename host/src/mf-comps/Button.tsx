import { loadRemote } from "@module-federation/enhanced/runtime";
import React, { Suspense, useEffect, useState } from "react";

type DynamicModule = {
    module: string | null;
    scope: string | null;
}

function useDynamicImport({module, scope}: DynamicModule) {
    const [component, setComponent] = useState<React.FC | null>(null);

    useEffect(() => {
        if (!module || !scope) return;

        const loadComponent = async () => {
            try {
                const remote = await loadRemote<{default: React.FC}>(`${scope}/${module}`);
                if (!remote) {
                    console.warn(`loadRemote returns NULL for ${scope}/${module}`);
                    return;
                }
                setComponent(() => remote.default);
            } catch (error) {
                console.error(`Error loading module ${scope}/${module};`, error);
            }
        }

        void loadComponent();
    });

    return component;
}

export const Button = () => {
    const [{module, scope}, setSystem] = useState<DynamicModule>({
        scope: null,
        module: null
    });
    
    const Component = useDynamicImport({
        scope,
        module,
    });

    const setProvider = () => setSystem({
        scope: 'provider',
        module: 'button'
    });

    return <div>
        <button onClick={setProvider}>
            Load Widget
        </button>
        <div style={{marginTop: '2em'}}>
            <Suspense fallback="Loading...">
                {Component ? <Component /> : null}
            </Suspense>
        </div>
    </div>
}