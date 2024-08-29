import React from 'react';
import { init } from '@module-federation/enhanced/runtime';
import { Button } from './mf-comps/Button';
import { Widget } from './mf-comps/Widget';


// 1. init можно вызвать статически со списком всех ремоутов
// Компонент из провайдера загружается в компоненте Button
// 2. Подгружать новые ремоуты можно и динамически, пример этого сценария в компоненте Widget.
init({
    name: 'host',
    remotes: [
        {
            name: 'provider',
            entry: 'http://localhost:4002/remoteEntry.js'
        }
    ]
});

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