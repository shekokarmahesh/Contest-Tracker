# Contest Tracker
A MERN stack application to keep track of upcoming and past programming contests.

## 🎥 Demo Video  
[![Watch the Demo](https://img.youtube.com/vi/E4B-m1-_ELM/0.jpg)](https://www.youtube.com/watch?v=E4B-m1-_ELM)  

<iframe width="560" height="315" src="https://www.youtube.com/embed/E4B-m1-_ELM" frameborder="0" allowfullscreen></iframe>


## 🚀 Overview
The **Contest Tracker** is a MERN stack application that allows users to keep track of upcoming and past programming contests from popular platforms like Codeforces, CodeChef, and LeetCode. It also includes features like bookmarking contests, filtering by platform, and adding solution links for past contests.

## 🌟 Features
- **Upcoming & Past Contests:** Fetches contests from Codeforces, CodeChef, and LeetCode.
- **Contest Details:** Displays the contest name, date, and time remaining before the start.
- **Platform Filters:** Users can filter contests from specific platforms.
- **Bookmarking:** Users can save contests for easy access.
- **Solution Links:** A separate page to attach solution video links from our YouTube channel.
- **Bonus Features:**
  - Automatically fetch solution links from YouTube when uploaded.
  - Responsive UI for mobile and tablet devices.
  - Light/Dark mode toggle.
  - Well-documented codebase.

## 🏗️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS 

## 📸 Screenshots
(Include relevant screenshots of the application)

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB

### Steps to Run
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/contest-tracker.git
   cd contest-tracker
   ```
2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   npm start
   ```
3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   npm start
   ```
4. The app will be running on `http://localhost:3000/` (or as specified in `.env`).

## 🔧 Environment Variables
Create a `.env` file in the root of both `server` and `client` folders:

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/contests/upcoming` | Fetch upcoming contests |
| GET | `/api/contests/leetcode` | Fetch LeetCode contests |
| GET | `/api/contests/codeforces` | Fetch Codeforces contests |
| GET | `/api/contests/codechef` | Fetch CodeChef contests |
| GET | `/api/contests/past` | Fetch past contests |
| POST | `/api/bookmark` | Bookmark a contest |
| GET | `/api/bookmarks` | Fetch bookmarked contests |
| POST | `/api/solutions` | Attach YouTube solution link |

## 🎯 Future Enhancements
- Add notifications for upcoming contests.
- Include more platforms like AtCoder, HackerRank, etc.



## 👨‍💻 Contributors
- **[Mahesh Shekokar](https://github.com/shekokarmahesh)**

## 📜 License
This project is licensed under the MIT License.

---


