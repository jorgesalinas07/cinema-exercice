import {jest} from '@jest/globals'
import { get_movie } from '../javascript/get-movie';

describe("Get movie by id", () => {
    it("API fetch returns an error", async () => {
        const errorMessage = new Error('Fetch error')
        const consoleErrorMock = jest.fn();
        console.error = consoleErrorMock;

        const mockFetch = Promise.resolve({
            text: jest.fn().mockRejectedValue(errorMessage),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        await get_movie(1);
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    })

    it("API fetch successfully returns movie", async () => {
        const mockMovies = {
            "entries": 10,
            "results": [
              {
                "id": "mock_id_1"
              }
            ]
        }
        const mockFetch = Promise.resolve({
        text: jest.fn().mockResolvedValue(JSON.stringify(mockMovies)),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        const movies = await get_movie(1);

        expect(movies).toBeDefined();
        expect(movies[0].id).toBe("mock_id_1");
        expect(movies.length).toBe(1);
    })

    it("API fetch does not find the movie ID", async () => {
        const mockMovies = {
            "entries": 0,
            "results": null
        }
        const mockFetch = Promise.resolve({
        text: jest.fn().mockResolvedValue(JSON.stringify(mockMovies)),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        const movies = await get_movie();

        expect(movies).toBeDefined();
        expect(movies).toEqual(null);
    })

  })
