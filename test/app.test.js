const request = require("supertest");
const { getGames, getGamesById } = require("../controllers/index");
const { app } = require("../index");
const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getGames: jest.fn(),
  getGamesById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("API EndPoint tests", () => {
  it("GET /games should return all the games", async () => {
    const mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getGames.mockReturnValue(mockGames);

    const response = await request(server).get("/games");
    expect(response.body.response).toEqual(mockGames);
    expect(response.body.response.length).toBe(3);
  });

  it("GET /games/details/:id return a specific game", async () => {
    const mockGame = {
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    };

    getGamesById.mockReturnValue(mockGame);

    const response = await request(server).get("/games/details/1");
    expect(response.body.response).toEqual(mockGame);
    expect(response.status).toEqual(200);
  });
});

describe("contollers function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all the games", () => {
    const mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getGames.mockReturnValue(mockGames);

    const response = getGames();
    expect(response).toEqual(mockGames);
    expect(response.length).toEqual(3);
  });

  it("Should return specific game by its id", () => {
    const mockGame = {
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    };

    getGamesById.mockReturnValue(mockGame);

    const response = getGamesById(1);
    expect(response).toEqual(mockGame);
  });
});
