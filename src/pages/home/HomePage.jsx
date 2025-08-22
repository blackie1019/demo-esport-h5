import { useNavigate } from 'react-router'
import Container from '@app/shared/Container'

function HomePage() {
  const navigate = useNavigate()

  const goToSetup = () => {
    navigate('/setup')
  }

  const goToLobby = () => {
    navigate('/lobby')
  }

  const goToMatches = () => {
    navigate('/matches')
  }

  const goToMatch = () => {
    navigate('/match')
  }

  return (
    <Container>
      <div className="bg-island border-light h-full w-full space-y-4 rounded-xl border-1 px-[0.75rem] py-[2.5rem] text-center">
        <h1 className="text-primary-white mb-0.5 text-xl">Home Page</h1>
        <div
          className="bg-coloured-purple cursor-pointer rounded-md p-2.5"
          onClick={goToSetup}
        >
          <p className="text-primary-white">Setup</p>
        </div>
        <div
          className="bg-coloured-purple cursor-pointer rounded-md p-2.5"
          onClick={goToLobby}
        >
          <p className="text-primary-white">Lobby</p>
        </div>
        <div
          className="bg-coloured-purple cursor-pointer rounded-md p-2.5"
          onClick={goToMatches}
        >
          <p className="text-primary-white">Matches</p>
        </div>
        <div
          className="bg-coloured-purple cursor-pointer rounded-md p-2.5"
          onClick={goToMatch}
        >
          <p className="text-primary-white">Match</p>
        </div>
      </div>
    </Container>
  )
}

export const Component = HomePage
