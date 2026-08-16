export interface Organization {
  _id: string;
  name: string;
  slug?: string;

  ownerId?: string;

  subscriptionId?: string;
  planId?: string;

  logo?: {
    url?: string;
    publicId?: string;
  };

  email?: string;
  phone?: string;
  website?: string;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  timezone: string;

  status: "active" | "trial" | "inactive" | "suspended" | "cancelled";

  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationPayload {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  timezone?: string;
  planId?: string;
  ownerId: string;
  notes?: string;
}

export interface UpdateOrganizationPayload {
  name?: string;
  slug?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  timezone?: string;
  logo?: {
    url?: string;
    publicId?: string;
  };
}
