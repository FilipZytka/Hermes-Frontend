import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import Footer from "../../components/Shared/Footer";
import { logOutUser, registerUser } from "../../api/user";
import { popUp } from "../../utils/Popup";
import { validateToken } from "../../api/token";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading";
import TailwindImg from "../../assets/tailwind-css-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { loading, setLoading } = useAuth();
  const [inviter, setInviter] = useState("");

  const handleRegisterData = async (email: string, password: string) => {
    const response = await registerUser(email, password, token);

    if (!response.success) {
      popUp(response.payload!.message!, "error");
      return;
    }

    navigate("/login");
  };

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const searchedToken = queryParams.get("token");
    if (!searchedToken) {
      navigate("/login");
      return;
    }

    setToken(searchedToken);

    const validateTokenStatus = async () => {
      const response = await validateToken(searchedToken);
      setLoading(false);

      if (!response.success) {
        navigate("/login");
      }

      setInviter(response.payload!.createdBy);
      await logOutUser();
    };

    validateTokenStatus();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-center w-full h-screen flex-col">
      <div />
      <UserForm
        mainLabel={`You have been invited by ${inviter} to create an account`}
        imgUrl={TailwindImg}
        isEmailInput
        isPasswordInput
        isRepeatPasswordInput
        onFormSubmit={handleRegisterData}
      >
        <div className="sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2">
          <button
            type="submit"
            className="text-sm bg-gray-800 p-2 text-slate-100 hover:bg-gray-800 w-28 rounded-md"
          >
            Sign up
          </button>
        </div>
      </UserForm>
      <Footer />
    </div>
  );
};

export default Register;
