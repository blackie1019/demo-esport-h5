import { useNavigate } from 'react-router'
import { path } from './path'

export default function useRouter({ pathName }) {
  const navigate = useNavigate()
  return () => navigate(path[pathName])
}

export function useGoBack() {
  const navigate = useNavigate()
  return () => navigate(-1)
}
