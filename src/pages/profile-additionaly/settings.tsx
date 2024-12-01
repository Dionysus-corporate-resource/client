import { Checkbox } from "@/components/ui/checkbox";

export default function ProfileSettings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-muted  h-24 w-full rounded-xl"></div>
        <div className="bg-muted h-50 w-full rounded-xl row-span-2"></div>
        <div className="bg-muted h-24 w-full rounded-xl"></div>

        <div className="bg-muted h-24 w-full rounded-xl col-span-2"></div>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="bg-muted  h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
        <div className="bg-muted h-12 w-full rounded-xl"></div>
      </div>
    </div>
  );
}
