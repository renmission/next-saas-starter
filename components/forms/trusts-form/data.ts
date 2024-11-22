import { FormStep, TrustType } from "./types";

export const nevadaDynastyTrustQuestions: FormStep[] = [
  {
    title: "Nevada Dynasty Trust Application",
    description: "Please provide your basic information",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "text",
        placeholder: "MM/DD/YYYY",
        required: true,
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
        ],
        required: true,
      },
      {
        name: "occupation",
        label: "Occupation",
        type: "text",
        placeholder: "Enter your occupation",
        required: true,
      },
    ],
  },
  {
    title: "Contact Details",
    description: "How can we reach you?",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your@email.com",
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "+1 (555) 000-0000",
        required: true,
      },
      {
        name: "preferredContact",
        label: "Preferred Contact Method",
        type: "select",
        options: [
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "both", label: "Both" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Address Information",
    description: "Where are you located?",
    fields: [
      {
        name: "streetAddress",
        label: "Street Address",
        type: "text",
        placeholder: "123 Main St",
        required: true,
      },
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Your City",
        required: true,
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: [
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
          { value: "au", label: "Australia" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Trust Objectives",
    description: "What are your goals for this trust?",
    fields: [
      {
        name: "primaryGoal",
        label: "Primary Goal for the Trust",
        type: "select",
        options: [
          { value: "assetProtection", label: "Asset Protection" },
          { value: "estatePlanning", label: "Estate Planning" },
          { value: "wealthTransfer", label: "Wealth Transfer" },
        ],
        required: true,
      },
      {
        name: "descriptionOfGoals",
        label: "Describe Your Objectives for This Trust",
        type: "textarea",
        placeholder: "Explain your specific goals for the NAPT...",
        required: true,
      },
    ],
  },
  {
    title: "Asset Information",
    description: "Provide details on the assets for protection",
    fields: [
      {
        name: "assetTypes",
        label: "Types of Assets to Protect",
        type: "select",
        options: [
          { value: "realEstate", label: "Real Estate" },
          { value: "businessInterest", label: "Business Interests" },
          { value: "investments", label: "Investments" },
          { value: "personalItems", label: "Personal High-Value Items" },
        ],
        required: true,
      },
      {
        name: "assetValues",
        label: "Estimated Value of Each Asset",
        type: "textarea",
        placeholder: "List each asset and its estimated value...",
        required: true,
      },
    ],
  },
  {
    title: "Trustee and Beneficiary Information",
    description: "Details about the trustee and beneficiaries",
    fields: [
      {
        name: "trusteeName",
        label: "Proposed Trustee Name",
        type: "text",
        placeholder: "Name of Nevada-based trustee",
        required: true,
      },
      {
        name: "beneficiaries",
        label: "Beneficiaries",
        type: "textarea",
        placeholder: "List primary and contingent beneficiaries...",
        required: true,
      },
    ],
  },
  {
    title: "Financial and Legal Background",
    description: "Your current financial standing",
    fields: [
      {
        name: "creditorStatus",
        label: "Do you have any known creditors?",
        type: "select",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
        required: true,
      },
      {
        name: "legalConcerns",
        label: "Any pending or anticipated legal issues?",
        type: "textarea",
        placeholder: "Describe any ongoing or anticipated legal matters...",
        required: false,
      },
    ],
  },
  {
    title: "Privacy and Control Preferences",
    description: "Specify your privacy and control preferences",
    fields: [
      {
        name: "privacyPreference",
        label: "Do you wish to remain anonymous in public records?",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        name: "controlLevel",
        label: "Desired Level of Control Over Assets in Trust",
        type: "textarea",
        placeholder: "Describe any specific control preferences...",
        required: false,
      },
    ],
  },
  {
    title: "Final Details",
    description: "Review and confirm your information",
    fields: [
      {
        name: "confirmation",
        label: "Confirm that all information is correct",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        name: "signature",
        label: "Signature",
        type: "text",
        placeholder: "Type your full name",
        required: true,
      },
    ],
  },
];

export const nevadaAssetProtectionTrustQuestions: FormStep[] = [
  {
    title: "Nevada Dynasty Trust Application",
    description: "Please provide your basic information",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "text",
        placeholder: "MM/DD/YYYY",
        required: true,
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
        ],
        required: true,
      },
      {
        name: "occupation",
        label: "Occupation",
        type: "text",
        placeholder: "Enter your occupation",
        required: true,
      },
    ],
  },
  {
    title: "Contact Details",
    description: "How can we reach you?",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your@email.com",
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "+1 (555) 000-0000",
        required: true,
      },
      {
        name: "preferredContact",
        label: "Preferred Contact Method",
        type: "select",
        options: [
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "both", label: "Both" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Address Information",
    description: "Where are you located?",
    fields: [
      {
        name: "streetAddress",
        label: "Street Address",
        type: "text",
        placeholder: "123 Main St",
        required: true,
      },
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Your City",
        required: true,
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: [
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
          { value: "au", label: "Australia" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Trust Objectives",
    description: "What are your goals for this trust?",
    fields: [
      {
        name: "primaryGoal",
        label: "Primary Goal for the Trust",
        type: "select",
        options: [
          { value: "assetProtection", label: "Asset Protection" },
          { value: "estatePlanning", label: "Estate Planning" },
          { value: "wealthTransfer", label: "Wealth Transfer" },
        ],
        required: true,
      },
      {
        name: "descriptionOfGoals",
        label: "Describe Your Objectives for This Trust",
        type: "textarea",
        placeholder: "Explain your specific goals for the NAPT...",
        required: true,
      },
    ],
  },
  {
    title: "Asset Information",
    description: "Provide details on the assets for protection",
    fields: [
      {
        name: "assetTypes",
        label: "Types of Assets to Protect",
        type: "select",
        options: [
          { value: "realEstate", label: "Real Estate" },
          { value: "businessInterest", label: "Business Interests" },
          { value: "investments", label: "Investments" },
          { value: "personalItems", label: "Personal High-Value Items" },
        ],
        required: true,
      },
      {
        name: "assetValues",
        label: "Estimated Value of Each Asset",
        type: "textarea",
        placeholder: "List each asset and its estimated value...",
        required: true,
      },
    ],
  },
  {
    title: "Trustee and Beneficiary Information",
    description: "Details about the trustee and beneficiaries",
    fields: [
      {
        name: "trusteeName",
        label: "Proposed Trustee Name",
        type: "text",
        placeholder: "Name of Nevada-based trustee",
        required: true,
      },
      {
        name: "beneficiaries",
        label: "Beneficiaries",
        type: "textarea",
        placeholder: "List primary and contingent beneficiaries...",
        required: true,
      },
    ],
  },
  {
    title: "Financial and Legal Background",
    description: "Your current financial standing",
    fields: [
      {
        name: "creditorStatus",
        label: "Do you have any known creditors?",
        type: "select",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
        required: true,
      },
      {
        name: "legalConcerns",
        label: "Any pending or anticipated legal issues?",
        type: "textarea",
        placeholder: "Describe any ongoing or anticipated legal matters...",
        required: false,
      },
    ],
  },
  {
    title: "Privacy and Control Preferences",
    description: "Specify your privacy and control preferences",
    fields: [
      {
        name: "privacyPreference",
        label: "Do you wish to remain anonymous in public records?",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        name: "controlLevel",
        label: "Desired Level of Control Over Assets in Trust",
        type: "textarea",
        placeholder: "Describe any specific control preferences...",
        required: false,
      },
    ],
  },
  {
    title: "Final Details",
    description: "Review and confirm your information",
    fields: [
      {
        name: "confirmation",
        label: "Confirm that all information is correct",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        name: "signature",
        label: "Signature",
        type: "text",
        placeholder: "Type your full name",
        required: true,
      },
    ],
  },
];

export const getTrustQuestionsByTrustType = (
  trustType: TrustType,
): FormStep[] => {
  switch (trustType) {
    case TrustType.NEVADA_DYNASTY_TRUST:
      return nevadaDynastyTrustQuestions;
    case TrustType.NEVADA_ASSET_PROTECTION_TRUST:
      return nevadaAssetProtectionTrustQuestions;
    default:
      return [];
  }
};
