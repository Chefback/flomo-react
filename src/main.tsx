import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './views/App/App'
import store from '@/store'

import 'antd/dist/antd.less'
import './styles/reset.less'
import './styles/index.css'

Sentry.init({
    dsn: 'https://f58c7ae9a41ba3eb080b01dc09f76948@o4506399708807168.ingest.sentry.io/4506399711428608',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
