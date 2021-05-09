export interface UserRequestPayload {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  organizationId: number | null | undefined;
}
