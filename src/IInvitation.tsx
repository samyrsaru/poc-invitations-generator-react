export interface IInvitation {
    id: number,
    name: string,
    description: string,
    eventDate: Date,
    location: string,
    dressColorCode: string,
    isCustomColor?: boolean
};