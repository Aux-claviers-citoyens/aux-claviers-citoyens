import { defineEventHandler, getRequestURL, readRawBody } from 'h3'
import { useRuntimeConfig } from '#imports'

type ProxyOptions = {
  stripPrefix?: string
}

export const createBackendProxyHandler = (options: ProxyOptions = {}) => {
  const stripPrefix = options.stripPrefix?.replace(/\/+$/, '')

  return defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const envHost = process.env.API_PROXY_TARGET
    const envPort = process.env.API_PROXY_PORT || '8400'

    const backendBase =
      (envHost
        ? `http://${envHost}:${envPort}`
        : (config as any).backendBaseUrl) || 'http://localhost:8400'

    const { pathname, search } = getRequestURL(event)

    let suffix = pathname
    if (stripPrefix && suffix.startsWith(stripPrefix)) {
      suffix = suffix.slice(stripPrefix.length) || '/'
    }

    const targetUrl = backendBase.replace(/\/+$/, '') + suffix + search

    const headers: Record<string, string> = {}
    for (const [key, value] of Object.entries(event.node.req.headers)) {
      if (typeof value === 'string') headers[key] = value
    }
    delete headers.host
    delete headers['content-length']

    const method = event.method?.toUpperCase() || 'GET'
    const canHaveBody = !['GET', 'HEAD', 'OPTIONS'].includes(method)
    const body = canHaveBody ? await readRawBody(event, false) : undefined

    const response = await fetch(targetUrl, {
      method,
      headers,
      body: body ?? undefined,
    })

    const buffer = await response.arrayBuffer()

    event.node.res.statusCode = response.status
    response.headers.forEach((value, key) => {
      event.node.res.setHeader(key, value)
    })

    return new Uint8Array(buffer)
  })
}
