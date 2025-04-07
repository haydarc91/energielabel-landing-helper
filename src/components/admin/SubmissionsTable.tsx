
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
import { Badge } from "@/components/ui/badge";

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
  status: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  notes: string | null;
}

interface SubmissionsTableProps {
  submissions: ContactSubmission[];
  loading: boolean;
  formatDate: (dateString: string) => string;
  onSelectSubmission: (submission: ContactSubmission) => void;
}

const SubmissionsTable = ({ 
  submissions, 
  loading, 
  formatDate,
  onSelectSubmission 
}: SubmissionsTableProps) => {
  
  const getStatusBadge = (status: string | null) => {
    switch(status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Nieuw</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Contact gelegd</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ingepland</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Afgerond</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Geannuleerd</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Nieuw</Badge>;
    }
  };

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
                <TableHead>Adres</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Spoed</TableHead>
                <TableHead>Prijs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow 
                  key={submission.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onSelectSubmission(submission)}
                >
                  <TableCell>{formatDate(submission.created_at)}</TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.address || '-'}</TableCell>
                  <TableCell>{submission.property_type || '-'}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    {submission.rush_service ? 
                      <Badge className="bg-amber-500">Spoed</Badge> : 
                      <Badge variant="outline">Nee</Badge>
                    }
                  </TableCell>
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
