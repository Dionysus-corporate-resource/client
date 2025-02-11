import { ArrowDownRight, CornerRightUp, Package } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export default function SkeletonBookingCardLong() {
  return (
    <Card className="relative max-w-xl h-fit bg-card shadow-md">
      {/* Header section */}
      <div className="border-dashed border-b p-2 w-full flex items-center justify-between">
        <div className="flex items-center">
          <Badge variant="outline" className="space-x-2 w-32 border-none">
            <Package className="w-4 h-4 shrink-0 text-muted-foreground" />
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          </Badge>
        </div>
        <div className="h-4 w-24 bg-muted animate-pulse rounded mr-2" />
      </div>

      <div className="flex">
        {/* Left stats section */}
        <div className="w-[120px] border-dashed border-r border-border p-4 flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-start">
                <div className="h-5 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded opacity-50" />
              </div>
            ))}
          </div>
        </div>

        {/* Right content section */}
        <div className="flex-1 p-4 pr-0 mr-12">
          <div className="flex flex-col gap-8 h-full">
            {/* Loading location */}
            <div className="flex gap-2">
              <ArrowDownRight className="w-4 h-4 mt-[2px] text-muted-foreground" />
              <div className="space-y-2">
                <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded opacity-50" />
                <div className="h-4 w-40 bg-muted animate-pulse rounded opacity-50" />
              </div>
            </div>

            {/* Unloading location */}
            <div className="flex gap-2">
              <CornerRightUp className="w-4 h-4 mt-[2px] text-muted-foreground" />
              <div className="space-y-2">
                <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Right edge slot */}
        <div className="absolute right-0 h-[calc(100%-38px)] w-12 border-l border-dashed border-border" />
      </div>
    </Card>
  );
}
