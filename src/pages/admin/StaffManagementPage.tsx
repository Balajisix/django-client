import { PlaceholderPage } from "../../components/layout/PlaceholderPage";

export function StaffManagementPage() {
  return (
    <PlaceholderPage
      title="Staff Management"
      description="Create claims officer / manager / admin accounts and change roles."
      stageNote="Built in Stage 6 — admin. The backend is already live: POST /api/v1/auth/users/create-staff/ and PATCH /api/v1/auth/users/{id}/role/."
    />
  );
}
