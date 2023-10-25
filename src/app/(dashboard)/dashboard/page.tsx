import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  return <div className="flex">Dashboard</div>;
};

export default page;
