import { useAuth } from "@/app/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const authContext = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 px-1 py-1.5 text-left text-sm">
        <Avatar className="h-12 w-12 rounded-sm">
          <AvatarImage
            src="/avatars/shadcn.jpg"
            alt={authContext?.user?.userName}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {authContext?.user?.userName}
          </span>
          <span className="truncate text-xs">{authContext?.user?.email}</span>
        </div>
        <Badge variant="secondary">{authContext?.user?.roles[0]}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="bg-muted  h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
      </div>
      {/* <Separator style={{ border: "1px solid hsl(0, 0%, 96%)" }} /> */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-muted  h-24 w-full rounded-xl"></div>
        <div className="bg-muted h-50 w-full rounded-xl row-span-2"></div>
        <div className="bg-muted h-24 w-full rounded-xl"></div>

        {/* <div className="bg-muted h-24 w-full rounded-xl"></div> */}
      </div>
    </div>
  );
}
