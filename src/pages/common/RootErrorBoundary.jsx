import { useRouteError } from 'react-router'
import { Component as GeneralErrorPage } from '@app/pages/error/GeneralErrorPage'

export default function RootErrorBoundary() {
  const error = useRouteError()
  console.error(error) /* eslint-disable-line no-console */

  return <GeneralErrorPage />
}
