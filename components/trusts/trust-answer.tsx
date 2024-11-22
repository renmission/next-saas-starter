import React from "react";

import { Icons } from "@/components/shared/icons";

interface ClientAnswersDisplayProps {
  clientAnswers: Record<string, string>;
}

interface CategoryConfig {
  title: string;
  keys: string[];
  icon: React.ReactNode;
}

export function TrustAnswersDisplay({
  clientAnswers,
}: ClientAnswersDisplayProps) {
  const formatKey = (key: string) => {
    const words = key.split(/(?=[A-Z])|_/).map((word) => word.toLowerCase());
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    return capitalizedWords.join(" ");
  };

  const categories: CategoryConfig[] = [
    {
      title: "Personal Information",
      keys: [
        "firstName",
        "lastName",
        "dateOfBirth",
        "maritalStatus",
        "occupation",
      ],
      icon: <Icons.user className="h-5 w-5" />,
    },
    {
      title: "Contact Information",
      keys: [
        "email",
        "phone",
        "streetAddress",
        "city",
        "country",
        "preferredContact",
      ],
      icon: <Icons.mail className="h-5 w-5" />,
    },
    {
      title: "Other Information",
      keys: Object.keys(clientAnswers).filter(
        (key) =>
          ![
            "firstName",
            "lastName",
            "dateOfBirth",
            "maritalStatus",
            "occupation",
            "email",
            "phone",
            "streetAddress",
            "city",
            "country",
            "preferredContact",
          ].includes(key),
      ),
      icon: <Icons.folder className="h-5 w-5" />,
    },
  ];

  const renderCategory = (category: CategoryConfig) => {
    const relevantAnswers = category.keys.reduce(
      (acc, key) => {
        if (key in clientAnswers) {
          acc[key] = clientAnswers[key];
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    if (Object.keys(relevantAnswers).length === 0) return null;

    return (
      <div key={category.title} className="space-y-3">
        <h4 className="flex items-center space-x-2 text-base font-semibold">
          {category.icon}
          <span>{category.title}</span>
        </h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(relevantAnswers).map(([key, value]) => (
            <div key={key} className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                {formatKey(key)}
              </p>
              <p className="text-sm text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Client's Answers</h3>
      {categories.map(renderCategory)}
    </div>
  );
}
