// Central registry of TanStack Query keys so hooks and invalidations agree
// on shape without importing each other's internals.
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  account: {
    usage: ["account", "usage"] as const,
    subscription: ["account", "subscription"] as const,
    invoices: ["account", "invoices"] as const,
    billingDetails: ["account", "billing-details"] as const,
  },
  payments: {
    orderStatus: (merchantOrderId: string) =>
      ["payments", "order-status", merchantOrderId] as const,
  },
};
