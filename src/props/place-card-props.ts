export type PlaceCardProps = {
  image: string;
  price: number;
  description: string;
  rating: string;
  type: PlaceType;
  isPremium?: boolean;
  isInBookmarks?: boolean;
}

export enum PlaceType {
  Apartment = 'Apartment',
  Room = 'Room',
}
