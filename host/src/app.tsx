import React from 'react';
import { Button } from './mf-comps/Button';
import { Widget } from './mf-comps/Widget';
import { initDynamicFederation } from './mf-comps/MFLoader';

initDynamicFederation();

export const App = () => {

    return <div>
        <h1>Dynamic MicroFrontends Host</h1>
        <hr />
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div style={{ flexGrow: 1 }}><Button /></div>
            <div style={{ flexGrow: 1 }}><Widget /></div>
        </div>

    </div>
}