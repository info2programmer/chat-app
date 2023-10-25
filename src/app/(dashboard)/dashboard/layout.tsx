import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import IzifisoLogo from "../../../../public/logo.png";
import { UserPlus } from "lucide-react";
import SignOutButton from "@/components/ui/SignOutButton";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions";
import { fetchRedis } from "@/helper/redis";
import { getFriendsByUserId } from "@/helper/get-friends-by-user-id";
import SidebarChatList from "@/components/SidebarChatList";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unSeenFriendRequest = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="max-w-sm h-full flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Image src={IzifisoLogo} alt="Izifiso Logo" width={100} height={55} />
        </Link>
        {friends.length > 0 && (
          <div className="text-sm font-semibold leading-6">Your chats</div>
        )}

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                <li>
                  <Link
                    href="/dashboard/add"
                    className="text-gray-700 hover:text-yellow-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span className="text-gray-400 border-gray-200 group-hover:border-yellow-600 group-hover:text-yellow-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                      <UserPlus className="h-4 w-4" />
                    </span>

                    <span className="truncate">User Add</span>
                  </Link>
                </li>

                <li>
                  <FriendRequestSidebarOptions
                    initialUnseenRequestCount={unSeenFriendRequest}
                    sessionId={session.user.id}
                  />
                </li>
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
