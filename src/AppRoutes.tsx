import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useCreateMyUser } from './api/MyUserApi';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/protectedRoute';

const AppRoutes = () => {
    const { userId } = useAuth();
    const { user } = useUser();
    const { createUser } = useCreateMyUser();

    if (userId) {
        createUser({
            userId,
            email: user.primaryEmailAddress.emailAddress,
        });
    }

    return (
        <Routes>
            <Route path="/" element={<Layout showHero ><HomePage /></Layout>} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
    )
}

export default AppRoutes