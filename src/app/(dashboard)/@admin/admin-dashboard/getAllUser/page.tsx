import UserCard from "@/components/modules/admin-module/getAllUser";
import { userServices } from "@/services/user.service";


export default async function UsersPage() {
  const result = await userServices.getAllUsers();
  const users = result?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}