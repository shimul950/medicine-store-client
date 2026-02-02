import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserCardProps = {
  user: {
    id: string;
    name?: string | null;
    email: string;
    role: string;
    emailVerified: boolean;
  };
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name ?? "No Name"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>

        <p>
          <span className="font-medium">Role:</span>{" "}
          <Badge variant="secondary">{user.role}</Badge>
        </p>

        <p>
          <span className="font-medium">Verified:</span>{" "}
          {user.emailVerified ? "Yes " : "No "}
        </p>
      </CardContent>
    </Card>
  );
}