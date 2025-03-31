
import React from 'react';
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  property_type: string | null;
  surface_area: number | null;
  rush_service: boolean | null;
  message: string | null;
  calculated_price: number | null;
  created_at: string;
  postcode: string | null;
  house_number: string | null;
  house_number_addition: string | null;
}

interface SubmissionsTableProps {
  submissions: ContactSubmission[];
  loading: boolean;
  formatDate: (dateString: string) => string;
}

const SubmissionsTable = ({ submissions, loading, formatDate }: SubmissionsTableProps) => {
  return (
    <>
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-epa-green" />
        </div>
      ) : submissions.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Geen aanvragen gevonden</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Naam</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefoon</TableHead>
                <TableHead>Adres</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Spoed</TableHead>
                <TableHead>Prijs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{formatDate(submission.created_at)}</TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone || '-'}</TableCell>
                  <TableCell>{submission.address || '-'}</TableCell>
                  <TableCell>{submission.property_type || '-'}</TableCell>
                  <TableCell>{submission.rush_service ? 'Ja' : 'Nee'}</TableCell>
                  <TableCell>€{submission.calculated_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SubmissionsTable;
