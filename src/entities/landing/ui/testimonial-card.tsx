import { Card, CardContent } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-muted-foreground/20 absolute top-6 right-6" />
        <div className="space-y-4">
          <p className="text-muted-foreground">{quote}</p>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{author}</div>
              <div className="text-sm text-muted-foreground">
                {role}, {company}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
