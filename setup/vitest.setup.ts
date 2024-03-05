import { afterEach, beforeEach } from 'vitest';

import {
  mockWindowHistory,
  mockWindowLocation,
  restoreWindowHistory,
  restoreWindowLocation
} from './mockLocationHistory';

beforeEach(() => {
  mockWindowLocation('https://example.com');
  mockWindowHistory();
});

afterEach(() => {
  restoreWindowLocation();
  restoreWindowHistory();
});