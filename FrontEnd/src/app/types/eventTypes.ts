export interface EventDto {
    eventId: string
    title: string
    city: string
    placeVenue: string
    date: string
    details: string
    category: string
}

export interface EventResponse {
   result: EventDto[];
   message: string
   isSuccess: boolean
}
