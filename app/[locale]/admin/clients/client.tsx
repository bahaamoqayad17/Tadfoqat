"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Download, FileText, CheckCircle, XCircle } from "lucide-react";
import { toggleUserVerification } from "@/actions/user-actions";

export default function ClientsPage({ data }: { data: any }) {
  const columnHelper = createColumnHelper<any>();
  const t = useTranslations();
  const [togglingUser, setTogglingUser] = useState<string | null>(null);

  const handleToggleVerification = async (
    userId: string,
    currentStatus: boolean
  ) => {
    setTogglingUser(userId);
    try {
      const result = await toggleUserVerification(userId);
      if (result.status) {
        toast.success(
          result.isVerified
            ? t("userVerifiedSuccess")
            : t("userUnverifiedSuccess")
        );
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        toast.error(result.error || t("verificationToggleError"));
      }
    } catch (error) {
      console.error("Error toggling verification:", error);
      toast.error(t("verificationToggleError"));
    } finally {
      setTogglingUser(null);
    }
  };

  const downloadDocuments = async (documents: string[], clientName: string) => {
    if (!documents || documents.length === 0) {
      toast.error(t("noDocumentsFound"));
      return;
    }

    try {
      // Create a zip-like download for multiple documents
      const downloadPromises = documents.map(async (url, index) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          // Extract file extension from URL or use default
          const urlParts = url.split(".");
          const extension =
            urlParts.length > 1 ? urlParts[urlParts.length - 1] : "pdf";

          // Create download link
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `${clientName}_document_${index + 1}.${extension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

          return true;
        } catch (error) {
          console.error(`Error downloading document ${index + 1}:`, error);
          return false;
        }
      });

      const results = await Promise.all(downloadPromises);
      const successCount = results.filter(Boolean).length;

      if (successCount === documents.length) {
        toast.success(t("allDocumentsDownloaded"));
      } else if (successCount > 0) {
        toast.warning(
          t("someDocumentsDownloaded", {
            count: successCount,
            total: documents.length,
          })
        );
      } else {
        toast.error(t("downloadFailed"));
      }
    } catch (error) {
      console.error("Error downloading documents:", error);
      toast.error(t("downloadFailed"));
    }
  };
  const columns = [
    columnHelper.accessor("name", {
      header: t("name"),
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    }),
    columnHelper.accessor("email", {
      header: t("email"),
      cell: ({ row }) => {
        return <div>{row.original.email}</div>;
      },
    }),
    columnHelper.accessor("mobile_number", {
      header: t("mobile_number"),
      cell: ({ row }) => {
        return <div>{row.original.mobile_number}</div>;
      },
    }),
    columnHelper.accessor("id_number", {
      header: t("id_number"),
      cell: ({ row }) => {
        return <div>{row.original.id_number}</div>;
      },
    }),
    columnHelper.accessor("commercial_number", {
      header: t("commercial_number"),
      cell: ({ row }) => {
        return <div>{row.original.commercial_number}</div>;
      },
    }),
    columnHelper.accessor("isVerified", {
      header: t("verified"),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.isVerified ? (
              <Badge
                variant="success"
                className="cursor-pointer hover:bg-success/90"
              >
                {t("verified")}
              </Badge>
            ) : (
              <Badge
                variant="error"
                className="cursor-pointer hover:bg-error/70"
              >
                {t("unverified")}
              </Badge>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: t("createdAt"),
      cell: ({ row }) => {
        return (
          <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: t("actions"),
      cell: (info) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            size="sm"
            color="primary"
            variant="outline"
            onClick={() =>
              downloadDocuments(
                info.row.original.documents || [],
                info.row.original.name
              )
            }
            className="mr-2"
            disabled={
              !info.row.original.documents ||
              info.row.original.documents.length === 0
            }
          >
            <Download className="w-4 h-4 mr-1" />
            {t("show_documents")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleToggleVerification(
                info.row.original._id,
                info.row.original.isVerified
              )
            }
            disabled={togglingUser === info.row.original._id}
            className={
              info.row.original.isVerified
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "border-green-500 text-green-500 hover:bg-green-50 hover:text-green-700"
            }
          >
            {togglingUser === info.row.original._id ? (
              <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
            ) : info.row.original.isVerified ? (
              <>
                <XCircle className="w-4 h-4 mr-1" />
                {t("unverify")}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                {t("verify")}
              </>
            )}
          </Button>
          <Button
            size="sm"
            color="destructive"
            variant="outline"
            onClick={() => {}}
            // disabled={isDeleting === info.row.original._id}
          >
            {/* {isDeleting === info.row.original._id ? t("deleting") : t("delete")} */}
            {t("delete")}
          </Button>
        </div>
      ),
      enableGlobalFilter: false,
      enableSorting: false,
    }),
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("clients")}</h1>
        <Button color="primary" size="lg" onClick={() => {}}>
          {t("add")}
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
