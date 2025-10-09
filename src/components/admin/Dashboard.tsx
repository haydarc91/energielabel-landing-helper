import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, FileText, TrendingUp, Clock } from "lucide-react";
import { ContactSubmission } from "./SubmissionsTable";
import { WebsiteContent } from "./WebContentEditor";

interface DashboardProps {
  submissions: ContactSubmission[];
  webContent: WebsiteContent[];
}

export function Dashboard({ submissions, webContent }: DashboardProps) {
  const newSubmissions = submissions.filter(s => s.status === 'new').length;
  const scheduledSubmissions = submissions.filter(s => s.status === 'scheduled').length;
  const totalRevenue = submissions
    .filter(s => s.calculated_price)
    .reduce((sum, s) => sum + (s.calculated_price || 0), 0);
  
  const recentSubmissions = submissions.slice(0, 5);

  const stats = [
    {
      title: "Nieuwe Aanvragen",
      value: newSubmissions,
      icon: Inbox,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Ingepland",
      value: scheduledSubmissions,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Totale Aanvragen",
      value: submissions.length,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Content Pagina's",
      value: webContent.length,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Overzicht van alle activiteiten</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Recente Aanvragen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Geen aanvragen</p>
            ) : (
              <div className="space-y-3">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{submission.name}</p>
                      <p className="text-xs text-gray-500 truncate">{submission.address}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="text-sm font-medium text-epa-green">
                        €{submission.calculated_price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Statistieken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Totale Omzet</span>
                <span className="text-lg font-bold text-green-600">€{totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Conversie Rate</span>
                <span className="text-lg font-bold text-blue-600">
                  {submissions.length > 0 ? Math.round((scheduledSubmissions / submissions.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Gemiddelde Prijs</span>
                <span className="text-lg font-bold text-purple-600">
                  €{submissions.length > 0 ? Math.round(totalRevenue / submissions.length) : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
