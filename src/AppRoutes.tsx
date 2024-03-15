import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useCreateMyUser } from './api/MyUserApi';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/protectedRoute';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
import AboutPage from './pages/AboutPage';

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
            <Route path="/" element={
                <Layout
                    showHero
                >
                    <HomePage />
                </Layout>
            }
            />
            <Route path="/about" element={
                <Layout
                    showHero
                    from="about"
                >
                    <AboutPage />
                </Layout>} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                } />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/manage-restaurant" element={
                    <Layout>
                        <ManageRestaurantPage />
                    </Layout>
                } />
            </Route>
            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage /></Layout>} />
            <Route element={<ProtectedRoute />}>
                <Route path="/detail/:restaurantId" element={
                    <Layout showHero={false}>
                        <DetailPage />
                    </Layout>
                }
                />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/order-status" element={
                    <Layout showHero={false}>
                        <OrderStatusPage />
                    </Layout>
                }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
    )
}

export default AppRoutes