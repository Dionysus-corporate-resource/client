import instance from "@/shared/api/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IProposalDevelopmentDto } from "@/shared/model/types/proposals-development";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheckBig, Loader, Wrench } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getProposalsDevelopment = async (): Promise<
  IProposalDevelopmentDto[]
> => {
  return instance.get("/proposals-development").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const StatusVariant = ({
  status,
}: {
  status: IProposalDevelopmentDto["status"];
}) => {
  switch (status) {
    case "done":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant="ghost">
                <CircleCheckBig />
                {/* сделано */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Сделано</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "in_progress":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant="ghost">
                {/* <IterationCw /> */}
                {/* <Spline /> */}
                <Wrench />
                {/* в работе */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>В работе</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "pending":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant="ghost">
                {/* <LoaderCircle /> */}
                <Loader className="animate-spin" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>В обработке</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
  }
};

export default function ProposalsDevelopmentPage() {
  const { data } = useQuery({
    queryKey: ["proposals-development"],
    queryFn: getProposalsDevelopment,
  });
  return (
    <div className="container  mx-auto">
      <div className="px-4 py-2 justify-items-center items-center">
        {/* {data?.map((proposalsDevelopment) => (
        <ProposalsDevelopmentItem proposalsDevelopment={proposalsDevelopment} />
      ))} */}

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Статус</TableHead>
              <TableHead className="w-[300px]">Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead className="w-[300px] text-right">Тип</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell>
                  {/* <Badge variant="outline">{invoice.status}</Badge> */}
                  <StatusVariant status={invoice.status} />
                </TableCell>
                <TableCell className="font-medium">{invoice.name}</TableCell>

                <TableCell>{invoice.description}</TableCell>

                <TableCell className="text-right">{invoice.topic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
