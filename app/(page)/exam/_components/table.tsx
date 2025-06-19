"use client";

import Button from "@/components/Commons/Form/Button/Button";
import React, { useState } from "react";
import DownloadModal from "../list/_components/DownloadModal";

const initialData = [
  {
    id: 1,
    name: "임의시험 1",
    layer: "STEP01",
    date: "2021-01-01",
  },
  {
    id: 2,
    name: "임의시험 2",
    layer: "STEP02",
    date: "2021-01-02",
  },
  {
    id: 3,
    name: "임의시험 3",
    layer: "STEP03",
    date: "2021-01-03",
  },
];

const initialColumns = [
  {
    header: "시험 ID",
    accessorKey: "id",
  },
  {
    header: "시험 이름",
    accessorKey: "name",
  },
  {
    header: "레이어",
    accessorKey: "layer",
  },
  {
    header: "다운로드",
    accessorKey: "download",
    accessorValue: null,
  },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    setSelectedExamId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExamId(null);
  };

  const handleConfirmDownload = () => {
    // 실제 다운로드 로직 구현
    console.log(`다운로드 시작: 시험 ID ${selectedExamId}`);
    handleCloseModal();
  };

  const updatedColumns = [
    {
      header: "시험 ID",
      accessorKey: "id",
    },
    {
      header: "시험 이름",
      accessorKey: "name",
    },
    {
      header: "레이어",
      accessorKey: "layer",
    },
    {
      header: "다운로드",
      accessorKey: "download",
      accessorValue: null, // 이제 동적으로 생성
    },
  ];

  return (
    <div>
      <table className="divide-lightgray min-w-full divide-y">
        <thead className="border-t-2 border-black">
          <tr>
            {updatedColumns.map((column, index) => (
              <th
                key={column.accessorKey}
                className={`py-4 font-bold text-zinc-800`}
              >
                <div className="border-lightgray border-r-[1px]">
                  {column.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b-2 bg-white">
          {data.map((row) => (
            <tr key={row.id}>
              {updatedColumns.map((column) => (
                <td
                  key={column.accessorKey}
                  className="whitespace-nowrap border-b-[1px] px-6 py-4 text-center text-sm text-zinc-800"
                >
                  {column.accessorKey === "download" ? (
                    <Button
                      label="다운로드"
                      variant="defaultBlack"
                      size="sm"
                      onClick={() => handleDownload(row.id)}
                    />
                  ) : (
                    row[column.accessorKey as keyof typeof row]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <DownloadModal
        isOpen={isModalOpen}
        examId={selectedExamId}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDownload}
      />
    </div>
  );
};

export default Table;
