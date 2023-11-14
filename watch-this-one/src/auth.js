import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const token = JSON.parse(localStorage.getItem("movieToken"))?.token

    if (!token) {
        throw redirect(
            `/?message=You must log in first.&redirectTo=${pathname}`
        )
    }
    return token
}
