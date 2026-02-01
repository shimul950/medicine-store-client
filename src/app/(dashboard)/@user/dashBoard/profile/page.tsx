
import { ProfileCard } from "@/components/modules/user-dashboard/profileCard";
import { userServices } from "@/services/user.service";

export default async function ProfilePage() {
  const { data } = await userServices.getsession();
  const user = data.user;

  return (
    <div >
      <ProfileCard user={user} />
    </div>
  );
}
