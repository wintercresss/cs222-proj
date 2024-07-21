This is a copy of a Spotify assistant app I made for my CS222 course. Alongside myself, I was on a team with Ayush Goyal, Yongzheng Yang, Amy Bisalputra. For this project, I was responsible for the backend, including the password encryption, song search history database, and all search queries

## How to run the application from terminal?
### Run Backend 
     - Navigate to the backend folder (cd backend/)
     - Run: pip3 install -r requirements.txt --break-system-packages
     - Then run: flask run -p 5002
### Run Frontend 
     - Navigate to the frontend folder (cd frontend/)
     - If yarn not installed:
          - Run: brew install yarn or npm install -g yarn
     - Then, run: yarn
     - Run: yarn add react-router-dom and yarn add framer-motion
     - Run: npm run-script dev
