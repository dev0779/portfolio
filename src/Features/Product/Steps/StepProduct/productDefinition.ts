import type { Product } from "@/context/UserContext/ProductContext";


export const productsData: {
  private: Product[];
  company: Product[];
} = {
  private: [
    {
      id: 1,
      title: "BASE",
      name: "Essential",
      price: 49,
      description: "A simple package for getting started.",
      features: ["1 user", "10 GB storage", "Basic analytics", "1 integration"],
      type: "private",
    },
    {
      id: 2,
      title: "PLUS",
      name: "Essential Plus",
      price: 79,
      description: "More flexibility and features for personal use.",
      features: [
        "3 users",
        "50 GB storage",
        "Basic analytics",
        "2 integrations",
      ],
      type: "private",
    },
    {
      id: 3,
      title: "PRO",
      name: "Professional",
      price: 129,
      description: "A complete solution for more demanding needs.",
      features: [
        "10 users",
        "250 GB storage",
        "Advanced analytics",
        "5 integrations",
      ],
      type: "private",
    },
    {
      id: 4,
      title: "PRO+",
      name: "Premium",
      price: 199,
      description: "The complete premium experience.",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Advanced analytics",
        "Unlimited integrations",
      ],
      type: "private",
    },
  ],

  company: [
    {
      id: 1,
      title: "CORE",
      name: "Starter",
      price: 99,
      description: "A straightforward solution for small businesses.",
      features: [
        "5 users",
        "50 GB storage",
        "Basic analytics",
        "2 integrations",
      ],
      type: "company",
    },
    {
      id: 2,
      title: "TEAM",
      name: "Business",
      price: 199,
      description: "More capabilities for growing teams.",
      features: [
        "15 users",
        "250 GB storage",
        "Advanced analytics",
        "5 integrations",
      ],
      type: "company",
    },
    {
      id: 3,
      title: "EDGE",
      name: "Enterprise",
      price: 399,
      description: "Advanced features for larger organizations.",
      features: [
        "50 users",
        "1 TB storage",
        "Advanced analytics",
        "10 integrations",
      ],
      type: "company",
    },
    {
      id: 4,
      title: "APEX",
      name: "Corporate",
      price: 599,
      description: "A complete solution for large-scale business needs.",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Advanced analytics",
        "Unlimited integrations",
      ],
      type: "company",
    },
  ],
};
