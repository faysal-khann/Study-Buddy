import { useEffect, useState } from "react";
import type { StreamChat, UserResponse } from "stream-chat";

const useStreamUsers = (client: StreamChat, userId: string) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // don't fetch myself and admins
        const response = await client.queryUsers(
          {},
          { last_active: -1 },
          { limit: 50 },
        );

        const filteredUsers = response.users.filter(
          (user) => user.id !== userId && user.role !== "admin",
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // todo: sentry logs & capture exception
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUsers();
  }, [client, userId]);

  return { users, loading };
};

export default useStreamUsers;
