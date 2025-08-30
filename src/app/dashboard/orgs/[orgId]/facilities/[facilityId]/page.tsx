import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

export default function FacilitiesPage() {
  const params = useParams();
  const { orgId } = useParams();

  const facilities = useQuery(api.facilities.listByOrg, {
    orgId: orgId as Id<"orgs">,   // ✅ tell TypeScript + Convex it’s an Id
  });

  if (!facilities) return <div>Loading...</div>;

  return (
    <div>
      <h1>Facilities</h1>
      <ul>
        {facilities.map((f) => (
          <li key={f._id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}