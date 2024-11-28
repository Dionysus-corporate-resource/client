import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IProposalDevelopmentDto } from "@/shared/model/types/proposals-development";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProposalCardProps {
  proposalsDevelopment: IProposalDevelopmentDto;
}

export default function ProposalsDevelopmentItem({
  proposalsDevelopment,
}: ProposalCardProps) {
  const getStatusConfig = (status: IProposalDevelopmentDto["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "На рассмотрении",
          variant: "secondary" as const,
        };
      case "in_progress":
        return {
          label: "В работе",
          variant: "default" as const,
        };
      case "done":
        return {
          label: "Сделано",
          variant: "outline" as const,
        };
    }
  };

  const getTypeConfig = (type: IProposalDevelopmentDto["topic"]) => {
    switch (type) {
      case "bag":
        return {
          label: "Ошибка",
          variant: "destructive" as const,
        };
      case "proposals":
        return {
          label: "Предложение",
          variant: "secondary" as const,
        };
    }
  };

  const statusConfig = getStatusConfig(proposalsDevelopment.status);
  const typeConfig = getTypeConfig(proposalsDevelopment.topic);

  return (
    <Card className="flex gap-4 items-center w-full mx-auto pt-2 max-w-2xl rounded-lg justify-between h-fit overflow-y-auto overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="w-full flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger> {proposalsDevelopment.name}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {proposalsDevelopment.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-row justify-end w-full">
          <div className="flex gap-2">
            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            <Badge variant={typeConfig.variant}>{typeConfig.label}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
