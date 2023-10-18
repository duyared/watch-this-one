import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const token = localStorage.getItem("movieToken")

    if (!token) {
        throw redirect(
            `/movie?message=You must log in first.&redirectTo=${pathname}`
        )
    }
    return token
}
