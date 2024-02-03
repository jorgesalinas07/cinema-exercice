import {jest} from '@jest/globals'
import { get_movies } from '../javascript/get-movies';

describe("Get movies", () => {
    it("API fetch returns an error", async () => {
        const errorMessage = new Error('Fetch error')
        const consoleErrorMock = jest.fn();
        console.error = consoleErrorMock;

        const mockFetch = Promise.resolve({
            text: jest.fn().mockRejectedValue(errorMessage),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        await get_movies();
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    })

    it("API fetch successfully returns movies", async () => {
        const mockMovies = {
            "entries": 10,
            "results": [
              {
                "id": "mock_id_1"
              },
              {
                "id": "mock_id_2"
              },
              {
                "id": "mock_id_3"
              }
            ]
        }
        const mockFetch = Promise.resolve({
        text: jest.fn().mockResolvedValue(JSON.stringify(mockMovies)),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        const movies = await get_movies();

        expect(movies).toBeDefined();
        expect(movies[0].id).toBe("mock_id_1");
        expect(movies.length).toBe(3);
    })

    it("API fetch returns no movies", async () => {
        const mockMovies = {
            "entries": 10,
            "results": []
        }
        const mockFetch = Promise.resolve({
        text: jest.fn().mockResolvedValue(JSON.stringify(mockMovies)),
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetch);

        const movies = await get_movies();

        expect(movies).toBeDefined();
        expect(movies).toEqual([]);
    })

  })
