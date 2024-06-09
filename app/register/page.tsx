import RegisterForm from "./form";

export default function Register() {
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-bold tracking-wide text-gray-800">
              Sign Up
            </h2>
            {" "}
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
