export const BASE_URL = 'http://127.0.0.1:8000/';

export const TITLE_TEXT = {
  baseTitle: 'Welcome',
  winTitle: 'Big win, congratulation.',
  smallWinTitle: 'Small win, try again to win more.',
  noWinTitle: 'No Win, try again.',
};

export const OUTCOME_JSON = {
  winJSON: { value: [1, 1, 1] },
  smallWinJSON: { value: [2, 2, 0] },
  noWinJSON: { value: [3, 4, 5] },
};

export const OUTCOME_PATH = '/outcome.json';

export const CORS_ERROR_MESSAGE = "You are not allowed to access this api";
