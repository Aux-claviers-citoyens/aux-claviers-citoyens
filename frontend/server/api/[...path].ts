import { createBackendProxyHandler } from '../utils/backendProxy'

export default createBackendProxyHandler({ stripPrefix: '/api' })
