import { LoginForm } from "./form";

export default function Login() {
  return (
    <section className="container h-screen flex item-center justify-center">
      <div className="w-[600px] mt-[4rem]">
        <h3 className="text-center font-bold mb-[25px]">LOGIN</h3>
        <LoginForm />
      </div>
    </section>
  );
}
