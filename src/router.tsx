import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { RoleGate } from "./components/routing/RoleGate";

import { StaffManagementPage } from "./pages/admin/StaffManagementPage";
import { AnalyticsPage } from "./pages/analytics/AnalyticsPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { MyClaimsPage } from "./pages/customer/MyClaimsPage";
import { MyPoliciesPage } from "./pages/customer/MyPoliciesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoleHomeRedirect } from "./pages/RoleHomeRedirect";
import { ClaimsQueuePage } from "./pages/staff/ClaimsQueuePage";
import { CustomersPage } from "./pages/staff/CustomersPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <RoleHomeRedirect />,
          },

          // Customer-only
          {
            element: <RoleGate roles={["CUSTOMER"]} />,
            children: [
              {
                path: "my-policies",
                element: <MyPoliciesPage />,
              },
              {
                path: "my-claims",
                element: <MyClaimsPage />,
              },
            ],
          },

          // Claims Officer, Manager, Admin
          {
            element: (
              <RoleGate
                roles={[
                  "CLAIMS_OFFICER",
                  "MANAGER",
                  "ADMIN",
                ]}
              />
            ),
            children: [
              {
                path: "claims-queue",
                element: <ClaimsQueuePage />,
              },
            ],
          },

          // Manager, Admin
          {
            element: (
              <RoleGate roles={["MANAGER", "ADMIN"]} />
            ),
            children: [
              {
                path: "customers",
                element: <CustomersPage />,
              },
              {
                path: "analytics",
                element: <AnalyticsPage />,
              },
            ],
          },

          // Admin only
          {
            element: <RoleGate roles={["ADMIN"]} />,
            children: [
              {
                path: "admin/staff",
                element: <StaffManagementPage />,
              },
            ],
          },

          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
