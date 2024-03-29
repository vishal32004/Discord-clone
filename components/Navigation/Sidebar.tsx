import { Action } from "./Action";
import { ModeToggle } from "../mode-toggle";

import { ScrollArea } from "../ui/scroll-area";
import { ServerNavigation } from "./ServerNavigation";
import { Logout } from "../Logout";
import { presentProfile } from "@/lib/Profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Separator } from "../ui/separator";

const Sidebar = async () => {
    const profile = await presentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
        >
            <Action />
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <ServerNavigation
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <Logout />
            </div>
        </div>
    );
}

export default Sidebar;