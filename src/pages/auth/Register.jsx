import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak sama")
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email: dataForm.email,
            password: dataForm.password,
            options: {
                data: {
                    full_name: dataForm.full_name,
                },
            },
        })

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        navigate("/login")
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account
            </h2>

            {error ? (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded">
                    {error}
                </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="full_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
                >
                    {loading ? "Mohon Tunggu..." : "Register"}
                </button>
            </form>
        </div>
    )
}
