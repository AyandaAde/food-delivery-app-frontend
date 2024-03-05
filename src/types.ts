export type User = {
  _id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
}

export type Restaurant = {
  _id: string;
  user: string;
  restaurant: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTIme: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdate: string;
}

