import PageContainer from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";

const HomePage = () =>{
    const {user, logout} = useAuth();

    return (
        <PageContainer>
            <div>
                <h1>Welcome, {user?.name}</h1>
                <button onClick={logout}>Logout</button>
            </div>
        </PageContainer>
    )
};

export default HomePage;