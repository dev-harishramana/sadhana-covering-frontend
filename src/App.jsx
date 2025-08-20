import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./router/ProtectedRoute";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CreateProductForm = lazy(() => import("./pages/CreateProductForm"));
const EditProductForm = lazy(() => import("./pages/EditProductForm"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PlaceOrderPage = lazy(() => import("./pages/PlaceOrderPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Wrap all pages with header inside Layout */}
        <Route element={<Layout />}>
          {/* Public home page */}
          <Route path="/home" element={<Home />} />

          {/* Public product pages */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Admin only */}
          <Route path="/admin/add" element={<CreateProductForm />} />
          <Route path="/admin/edit/:id" element={<EditProductForm />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User-protected pages */}
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
