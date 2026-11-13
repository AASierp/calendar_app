import { test, expect, describe, jest, beforeEach } from "@jest/globals";
import type { CalendarEvent } from "../types/types";
import { getEvents, postEvent } from "../services/eventServices";

//global test setup

beforeEach(() => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>
});

describe("event services tests", () => {

    // POST TEST

    test("Event Post Test", async () => {

        //arrange
        const testEvent: CalendarEvent = {
            id: 1,
            creatorId: 2,
            title: "Test Event",
            description: "A TEST",
            date: "09.08.2026",
            time: "6:00",
            location: "My House"
        }

        const mockFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({ok: true} as Response);

        //act

        await postEvent(testEvent);

        //assert

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenNthCalledWith(1, "http://localhost:3001/events", {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(testEvent)})
    })


    //GET TEST

    test("Get Events", async() => {
        //arrange

        const expectedResponse: CalendarEvent[] = [{id: 1,
            creatorId: 2,
            title: "Test Event",
            description: "A TEST",
            date: "09.08.2026",
            time: "6:00",
            location: "My House"}]

    jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: jest
            .fn<() => Promise<CalendarEvent[]>>()
            .mockResolvedValue(expectedResponse)
    } as unknown as Response);

        //act
        const response = await getEvents();

        //assert

        expect(response).toEqual(expectedResponse)
    })

    //DELETE TEST

    test("Delete Event Test", () => {
        //arrange

        const eventId = 1;



        //act


        //assert
    })

})

