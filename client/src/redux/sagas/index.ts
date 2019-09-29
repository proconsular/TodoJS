import * as admission from './admission'
import * as test from './test'
import * as tasks from './tasks'

export const initSagas = (sagaMiddleware: any) => {
    let sagas: any[] = [
        ...Object.values(admission),
        ...Object.values(test),
        ...Object.values(tasks),
    ]
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware))
}

