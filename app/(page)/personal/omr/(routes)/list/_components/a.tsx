import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OmrUploadStatus() {
  const subjects = [
    { name: "국어", status: "대기" },
    { name: "수학", status: "대기" },
    { name: "영어", status: "대기" },
    { name: "한국사", status: "대기" },
    { name: "탐구", status: "대기" },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>OMR 업로드 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>영역</TableHead>
                <TableHead>확인 현황</TableHead>
                <TableHead className="text-right">결과 확인/수정</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject, idx) => (
                <TableRow key={idx}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" /> {subject.status}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      확인하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <Button>최종 제출</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
