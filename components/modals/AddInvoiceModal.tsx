"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";

interface InvoiceItem {
  id: string;
  itemNumber: string;
  itemName: string;
  price: string;
  quantity: string;
}

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInvoiceModal({
  isOpen,
  onClose,
}: AddInvoiceModalProps) {
  const t = useTranslations();
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      itemNumber: "",
      itemName: "",
      price: "",
      quantity: "",
    },
  ]);

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addNewItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      itemNumber: "",
      itemName: "",
      price: "",
      quantity: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Invoice submitted:", items);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center">
            {/* Icon */}
            <div className="flex items-center justify-center w-full mb-6">
              <div className="w-20 h-20 bg-[#197BBD] rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {t("addInvoiceModalTitle")}
            </h1>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Items Section */}
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="space-y-4">
                  {/* Item Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {index === 0 ? "المنتج الأول" : `المنتج ${index + 1}`}
                    </h3>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 bg-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Item Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Row */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {t("optional")}
                        </span>
                        <Label
                          htmlFor={`itemNumber-${item.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("itemNumber")}
                        </Label>
                      </div>
                      <Input
                        id={`itemNumber-${item.id}`}
                        value={item.itemNumber}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "itemNumber",
                            e.target.value
                          )
                        }
                        className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                        placeholder={t("itemNumber")}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-500">
                          {t("required")}
                        </span>
                        <Label
                          htmlFor={`itemName-${item.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("itemName")}
                        </Label>
                      </div>
                      <Input
                        id={`itemName-${item.id}`}
                        value={item.itemName}
                        onChange={(e) =>
                          handleItemChange(item.id, "itemName", e.target.value)
                        }
                        className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                        placeholder={t("itemName")}
                        required
                      />
                    </div>

                    {/* Second Row */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {t("optional")}
                        </span>
                        <Label
                          htmlFor={`price-${item.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("price")}
                        </Label>
                      </div>
                      <Input
                        id={`price-${item.id}`}
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(item.id, "price", e.target.value)
                        }
                        className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                        placeholder={t("price")}
                        step="0.01"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-500">
                          {t("required")}
                        </span>
                        <Label
                          htmlFor={`quantity-${item.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("quantity")}
                        </Label>
                      </div>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(item.id, "quantity", e.target.value)
                        }
                        className="border-green-200 focus:border-green-400 focus:ring-green-400 text-right bg-white"
                        placeholder={t("quantity")}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Product Button */}
            <div className="flex items-center justify-between pt-4 border-t">
              {/* Total Amount */}
              <div className="text-green-600 font-semibold text-lg">
                {t("totalAmount")}: SAR {calculateTotal().toFixed(2)}
              </div>

              <button
                type="button"
                onClick={addNewItem}
                className="text-[#197BBD] hover:text-blue-800 font-medium text-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                {t("addAnotherProduct")}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#197BBD] hover:bg-blue-800 text-white"
              >
                {t("addInvoice")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
