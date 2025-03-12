import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const email = localStorage.getItem("reset_email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/"); 
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.error(err);

      const rawMessage = err.errors?.[0]?.message || "";

      let customMessage = "Erro ao redefinir senha.";

      if (rawMessage.toLowerCase().includes("code") || rawMessage.toLowerCase().includes("incorrect")) {
        customMessage = "Código inválido, tente novamente...";
      }

      setError(customMessage);
    }
  };

  return (
    <>
      <Header />

      <h1 className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 sm:pl-[174px]">
        <span>Reset Password</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span>Reset Password</span>
        </div>
      </section>

      <div className="flex justify-center items-center bg-white mt-16 mb-16 px-4">
        <div className="w-full max-w-sm p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código de verificação
              </label>
              <input
                type="text"
                id="code"
                placeholder="Digite o código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Nova senha
              </label>
              <input
                type="password"
                id="new-password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmar nova senha
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800"
            >
              Redefinir senha
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResetPassword;
