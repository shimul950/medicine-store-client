// src/constants/roles.ts

export const Role = {
  admin: "ADMIN",
  seller: "SELLER",
  user: "USER",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
