import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../../lib/api";
import { storeAuthToken } from "../../lib/auth";

type LoginResponse = {
  token?: string;
  access_token?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await apiRequest<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
      const token = response.token ?? response.access_token;

      if (!token) {
        throw new Error("The API did not return an authentication token.");
      }

      storeAuthToken(token);
      navigate("/profile");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to log in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-6 py-10">
      <section className="mx-auto max-w-md rounded-md border border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Sign in to your National Parks account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
