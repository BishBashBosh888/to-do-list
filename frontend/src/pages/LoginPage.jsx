import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm"
import PageContainer from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";
import { useEffect,useState } from "react";

const LoginPage = () =>{
    const {user} = useAuth();
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (user && !isRedirecting) {
          setIsRedirecting(true);
          navigate('/');
        }
      }, [user, navigate, isRedirecting]);

    return (
        <PageContainer>
            <LoginForm />
        </PageContainer>
    )
};

export default LoginPage;