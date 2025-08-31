import React from "react";

export default function Title({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="line"></div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
    </div>
  );
}
