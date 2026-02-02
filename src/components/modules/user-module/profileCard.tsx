"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type ProfileOverviewProps = {
  user: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null;
    createdAt?: string | Date;
  };
};

export function ProfileCard({ user }: ProfileOverviewProps) {
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.API_URL}/api/auth/profile/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const data = await res.json();
      alert("Profile updated successfully!");
      console.log("Updated user:", data.user);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-1/2">
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className="text-2xl">{user.name?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.name ?? "Unnamed User"}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="mt-2">
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-6">
          <Info label="Role" value={user.role} />
          <Info label="Joined" value={user.createdAt ? new Date(user.createdAt).toDateString() : "—"} />
        </CardContent>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "—"}</p>
    </div>
  );
}


