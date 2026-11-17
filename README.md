# Coy Discover

A simple, mobile-friendly discovery feature built as part of the Coy SDE Intern assignment.

The idea is to let users discover profiles, express interest by liking or passing, and connect when both people like each other.

The application has three sections:
- Home: A placeholder tab.
- Discover: Browse profiles and swipe left or right.
- Matches: View profiles where the interest is mutual.

One important thing I focused on while building this is Coy's privacy concept: users should only know who liked them when the interest is mutual.

## Features

- Includes 30 sample profiles with names, ages, photos, bios, cities and interests.
- Some profiles have already liked the current user to make matching possible during the demo.
- Displays one profile at a time.
- Supports left and right swipe gestures.
- Includes Like and Pass buttons for easier desktop interaction.
- Shows visual feedback when interacting with profile cards.
- Prevents profiles from appearing again after they have been swiped on.
- Displays a match popup when two users like each other.
- Includes a separate Matches section for mutual matches.
- Shows an empty state when all available profiles have been viewed.
- Saves swipe history and matches in SQLite, so refreshing the page does not reset progress.

## Technologies Used

Frontend
- React.js
- Vite
- CSS
- Lucide React icons

Backend
- Node.js
- Express.js
- REST APIs

Database
- SQLite

## Getting Started

Make sure Node.js and npm are installed on your system.

Clone the repository:

bash:
git clone "URL"
cd coy-discover


Install the dependencies:


npm install
npm run install:all


Start the application:

npm run dev

Open the application in your browser:

http://localhost:5173

The frontend runs on port 5173, and the backend API runs on port 4000.

## Quick Demo

You can test the matching functionality using the seeded profiles.

1. Open the Discover tab.
2. Find Rohan (the second profile).
3. Click the Like button.
4. Since Rohan has already liked the current user, a mutual match should be created.
5. A match popup will appear.
6. Open the Matches tab to see the new match.
7. Refresh the browser and check that the match is still there.

You can also like profiles that haven't liked you. In that case, no match information is revealed.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/feed` | Returns profiles that haven't been swiped on. |
| POST | `/swipe` | Records a like or pass and checks for a mutual match. |
| GET | `/matches` | Returns the user's mutual matches. |

Example request for the swipe API:

```json
{
  "profileId": 2,
  "action": "like"
}
```

The action can be either `like` or `pass`.

## Privacy and Matching Logic

Privacy was an important part of this assignment, so I handled the matching logic on the backend.

- Incoming likes are stored in the database and are not exposed through the feed API.
- The feed returns the same profile information regardless of whether someone has already liked the user.
- A match is created only when both users have liked each other.
- Passing or liking a profile removes it from the available feed.
- Duplicate swipes are prevented.
- Only mutual matches are returned by the Matches API.

This ensures that users cannot discover who liked them unless the interest is mutual.

## Project Structure

```text
coy-discover/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── data/
│   ├── db.js
│   ├── index.js
│   └── package.json
│
├── package.json
└── README.md
```

## Future Improvements

If I had more time to extend this application, I would like to work on:

- Adding real user authentication.
- Allowing users to create and edit their profiles.
- Improving profile recommendations based on shared interests.
- Adding chat functionality after a mutual match.
- Writing automated tests for the APIs and matching logic.
- Adding rate limiting and additional backend validation.

## Author

Viritha Chunchu

B.Tech – Computer Science, Cybersecurity Specialization


