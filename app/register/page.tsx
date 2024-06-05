import RegisterForm from "./form"

export default function Register() {
    return (
        <>
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-center text-3xl font-bold tracking-wide text-gray-800">Sign Up</h2>
                        <p className="text-center text-sm text-gray-600 mt-2">Already have an account? <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline" title="Sign In">Sign in here</a></p>
                    </div>

                    <RegisterForm/>
                    
                </div>
            </div>
        </>
    )
}
