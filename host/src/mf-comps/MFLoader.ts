import { loadRemote, registerRemotes } from "@module-federation/enhanced/runtime";
import React from "react";

enum MFState {
    INIT,
    REGISTERED,
    LOADED
}

export class WidgetMFLoader {

    private state: MFState = MFState.INIT;

    registerWidgetRemote(moduleName: string, entry: string) {
        registerRemotes([{
            name: moduleName,
            entry
        }]);
        this.state = MFState.REGISTERED;
    }

    loadWidgetModule() {
        if (this.state != MFState.REGISTERED) {
            console.warn('loadWidgetModule was called before remote was registered');
            return null;
        }
        // если контейнер и встраиваемый компонент активно используют хуки, может понадобиться оборачивание 
        // загрузки в React.lazy.
        // React.lazy рассчитывает на то, что компонент будет экспортирован как дефолтный.
        // Если он не экспоритруется как дефолтный,
        // придется дополнительно преобразовать результат loadRemote. 
        const comp = React.lazy(
            () => loadRemote<{Widget: React.FC}>(`provider_2/widget`)
                .then(md => md 
                    ? ({default: md.Widget}) 
                    : Promise.reject()));
        this.state = MFState.LOADED;

        return comp;
    }
}

export class ButtonMFLoader {
    async loadButtonModule(scope: string, module: string) {
        const component = await loadRemote<{default: React.FC}>(`${scope}/${module}`);
        return component?.default ?? null;
    }
}