import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = ({ isListView = false }) => {
  return (
    <Card className={`p-3 ${isListView ? "flex" : ""}`}>
      <CardContent className={`p-0 ${isListView ? "flex w-full" : ""}`}>
        {/* Image placeholder */}
        <div
          className={`relative bg-white ${
            isListView ? "w-48 flex-shrink-0" : ""
          }`}
        >
          <Skeleton
            className={`${isListView ? "h-48" : "h-48 w-full"} rounded-lg`}
          />
        </div>

        {/* Content placeholder */}
        <div
          className={`p-4 ${
            isListView ? "flex-1 flex flex-col justify-between" : ""
          }`}
        >
          <div>
            <Skeleton
              className={`h-4 mb-2 ${isListView ? "w-2/3" : "w-1/2"}`}
            />
            <Skeleton className="h-3 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/4 mb-3" />
          </div>
          <Skeleton className={`h-8 ${isListView ? "w-32" : "w-full"}`} />
        </div>
      </CardContent>
    </Card>
  );
};
