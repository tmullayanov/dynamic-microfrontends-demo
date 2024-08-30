import React, { Suspense, useEffect, useState } from "react";
import { ButtonMFLoader } from "./MFLoader";

type DynamicModule = {
    module: string | null;
    scope: string | null;
}

// might be injected from context or as a prop.
// I left it this way for the sake of simplicity of the example.
const buttonLoader = new ButtonMFLoader();

function useDynamicImport({module, scope}: DynamicModule) {
    const [component, setComponent] = useState<React.FC | null>(null);

    useEffect(() => {
        if (!module || !scope) return;

        const loadComponent = async () => {
            try {
                const remote = await buttonLoader.loadButtonModule(scope, module);
                setComponent(() => remote);
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