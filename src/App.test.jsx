// import {describe, expect, test} from 'vitest';
// import {fireEvent, render, screen} from '@testing-library/react';
// import App from './App';

// describe('counter tests', () => {
    
//   test("Counter should be 0 at the start", () => {
//     render(<App />);
//     expect(screen.getByText('count is: 0')).toBeDefined();
//   });

//   test("Counter should increment by one when clicked", async () => {
//     render(<App />);
//     const counter = screen.getByRole('button');
//     fireEvent.click(counter);
//     expect(await screen.getByText('count is: 1')).toBeDefined();
//   });

// });

// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', () => {
//     render(<App />);
//     screen.getByText(/2018/);
//   });
// });


// // await to find the text, otherwise it will return true for some reason idk
// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', async () => {
//     render(<App />);
//     await screen.findByText(/2018/);
//   });
// });

import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import {useAuthState, useDbData} from './utilities/firebase';

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": {
  }
};

vi.mock('./utilities/firebase');

beforeEach(() => {
  useDbData.mockReturnValue([mockSchedule, null]);
  useAuthState.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    //since we're not returning a promise, we dont need to await
    screen.getByText(/1850/);
  });
});


// {
//   "rules": {
//     ".read": "now < 1732428000000",  // 2024-11-24
//     ".write": "now < 1732428000000",  // 2024-11-24
//   }
// }