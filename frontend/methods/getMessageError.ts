import { ApiError } from '~/types/exceptions/ApiError'

function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export const getMessageError = (
  error: unknown,
  message?: string,
  RetrievedOldMessage?: boolean,
): string =>
  isApiError(error)
    ? error.message
    : error instanceof TypeError
      ? 'Erreur réseau'
      : error instanceof Error
        ? `${message}${RetrievedOldMessage ? `\r\n${error.message ?? ''}` : ''}`
        : `Erreur inconnue: ${
            typeof error === 'object' && error && 'message' in error
              ? String((error as any).message)
              : (JSON.stringify(error) ?? String(error))
          }`
