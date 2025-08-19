import { useNavigate } from 'react-router'

function HomePage() {
  const navigate = useNavigate()

  const goToSetup = () => {
    navigate('/setup')
  }

  const goToLobby = () => {
    navigate('/lobby')
  }

  return (
    <div className="bg-globe flex min-h-screen items-center justify-center p-[1.25rem]">
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
      </div>
    </div>
  )
}

export const Component = HomePage
