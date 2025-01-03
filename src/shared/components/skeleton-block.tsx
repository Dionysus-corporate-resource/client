import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  stylesMainGrid?: string;
  stylesSkeletonItem?: string;
  countSkeletonItem: number;
};

export default function SkeletonBlock({
  stylesMainGrid,
  stylesSkeletonItem,
  countSkeletonItem,
}: Props) {
  return (
    <div className={`grid ${stylesMainGrid}`}>
      {Array.from({ length: countSkeletonItem }, (_, index) => {
        return (
          <Skeleton key={index} className={`w-full ${stylesSkeletonItem}`} />
        );
      })}
    </div>
  );
}
