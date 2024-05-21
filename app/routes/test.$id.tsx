import { useParams } from "@remix-run/react"

export default function Index() {
    const { id } = useParams()

    return <>{id}</>
}
