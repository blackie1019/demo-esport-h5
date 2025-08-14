import { useLocation } from 'react-router'

function GeneralErrorPage() {
  const location = useLocation()

  return (
    <div>
      <h1>General Error</h1>
      <div>{location.state?.httpStatus}</div>
    </div>
  )
}

export const Component = GeneralErrorPage
