import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importando ícones de olho

const ResetPassword: React.FC = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const email = localStorage.getItem("reset_email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const validatePassword = (password: string) => {
   
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    const validationErrors: { [key: string]: string } = {};

    
    if (!code.trim()) {
      validationErrors.code = "O código de verificação é obrigatório.";
    }

    if (!newPassword.trim()) {
      validationErrors.newPassword = "A nova senha é obrigatória.";
    } else if (!validatePassword(newPassword)) {
      validationErrors.newPassword =
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "As senhas não coincidem.";
    }

   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    setErrors({});

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

      setErrors({ form: customMessage }); 
    }
  };

  return (
    <>
      <Header />

      <h1 className="bg-gray-100 text-left text-2xl pl-4 pt-6 pb-2 mb-0 sm:pl-[174px] text-primary-heading font-semibold">
        <span>Reset Password</span>
      </h1>

      <section className="flex items-center p-4 bg-gray-100 pt-0 pb-4 sm:pl-[174px]">
        <div className="flex items-center">
          <span className="mr-2 font-bold  text-sm text-custom">Ecommerce</span>
          <img src="/src/assets/arrow.png" alt=">" className="w-2 h-2 mr-2" />
          <span className="text-sm text-primary-heading font-semibold">Reset Password</span>
        </div>
      </section>

      <div className="flex justify-center items-center bg-white mt-16 mb-16 px-4">
        <div className="w-full max-w-sm p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-custom-gray">
                Código de verificação
              </label>
              <input
                type="text"
                id="code"
                placeholder="Digite o código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-custom-gray">
                Nova senha
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showNewPassword ? (
                    <FaEyeSlash style={{ color: "#474B57" }} /> 
                  ) : (
                    <FaEye style={{ color: "#474B57" }} /> 
                  )}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-custom-gray">
                Confirmar nova senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash style={{ color: "#474B57" }} /> 
                  ) : (
                    <FaEye style={{ color: "#474B57" }} /> 
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            
            {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-custom-button  text-white rounded-md text-sm cursor-pointer"
            >
              Redefinir senha
            </button>
          </form>
        </div>
      </div>

      <div className="mt-30">
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;