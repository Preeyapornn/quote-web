"use client";

import { useState } from "react";
import { login } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import logInPic from "../../../public/logIn.svg";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      loginContext(data.accessToken, data.user);
      router.push("/quotes");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="grid font-sans grid-cols-12 gap-4 min-h-screen bg-[#f4f1eb] p-4">
        <div className="hidden md:flex md:col-span-6 items-center justify-center p-8">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={logInPic}
              alt="Login Illustration"
              className=" object-cover mb-6"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex items-center justify-center p-6 bg-[#4F009A] rounded-none md:rounded-tr-[60px] md:rounded-br-[60px] shadow-md">
          <div className="flex flex-col items-center gap-4 justify-center ">
            <div className="flex flex-col items-center justify-center mb-8">
              <h1 className="text-5xl font-bold text-white mt-10  font-sans mb-4">
                Log in
              </h1>
              <div className="border-1 border-white w-60 my-2"></div>
              <div className="text-white  font-sans">
                Push your limits, with the power of quotes.
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full text-white max-w-sm my-8"
            >
              <label
                htmlFor="email"
                className="block text-sm  text-white font-bold mb-1"
              >
                Enter Your Email
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                className="border px-3 py-2 rounded-full w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="block text-sm  text-white font-bold mb-1"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                placeholder="Password"
                required
                className="border px-3 py-2 rounded-full w-full mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex gap-4 justify-between items-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => alert("Redirect to forgot password page")}
                >
                  Forgot password?
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-500 py-2 px-4 rounded-xl hover:text-white  hover:bg-blue-700 transition-colors"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <div>
              <button className="bg-white text-blue-500 py-2 px-4 rounded-xl flex items-center gap-3 hover:bg-blue-700 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffc107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#ff3d00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976d2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
                Log in with Google
              </button>
            </div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 my-2 text-white hover:text-gray-300 self-start mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#fff"
                  d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-.72 4.594L9.595 15.28l-.72.72l.72.72l5.687 5.686L16.72 21l-4-4H23v-2H12.72l4-4z"
                />
              </svg>
              <span className="text-sm font-bold">Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
