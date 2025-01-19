import { FormStepProps } from "../../model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export function ReviewStep({ formData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">First Name</TableCell>
            <TableCell>{formData.basicInfo?.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Last Name</TableCell>
            <TableCell>{formData.basicInfo?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Email</TableCell>
            <TableCell>{formData.basicInfo?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Phone</TableCell>
            <TableCell>{formData.details?.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Address</TableCell>
            <TableCell>{formData.details?.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">City</TableCell>
            <TableCell>{formData.details?.city}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
