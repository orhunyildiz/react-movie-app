# Movie App

Movie App is a React-based application that lets you search for movies, view details, paginate through results, and manage a list of your favorite movies using the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features

-   **Movie Search:** Users can search for movies by entering at least 3 characters in the search bar.
-   **Pagination:** Search results are split into pages. Navigate using page numbers, previous/next buttons, with a limited window of pages displayed (with ellipses for gaps).
-   **Movie Details:** Click on a movie card to view its details (poster, title, release date, rating, overview, genres, etc.).
-   **Favorite Movies List:** Add movies to your favorites list. The list displays each movie's TMDB rating, your personal rating, and its runtime.
-   **Summary Information:** The summary section shows the average TMDB rating, the average user rating, and the total duration of all movies in your list.
-   **Back to Top Button:** A button appears in the lower-right corner when scrolling down. Clicking it smoothly scrolls the page back to the top.
-   **Custom Hooks:**
    -   `useMovies`: Fetches movies from the TMDB API and handles pagination.
    -   `useMovieDetails`: Fetches detailed information for a selected movie.
    -   `useLocalStorage`: A utility hook to manage local storage state.

## Installation

### Requirements

-   [Node.js](https://nodejs.org/) (version 12.x or later)
-   npm or yarn

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/orhunyildiz/react-movie-app.git
    cd movie-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the application:**

    ```bash
    npm run dev
    # or
    yarn run dev
    ```

4. **Open your browser:**  
   Visit `http://localhost:5173` to see the app in action.

## Project Structure

-   **src/**
    -   **App.jsx:** The main component that ties together the search, movie list, movie details, pagination, and favorite movies components.
    -   **useMovies.js:** A custom hook that handles API calls and pagination logic using the TMDB API.
    -   **useMovieDetails.jsx:** A custom hook for fetching detailed information of a selected movie.
    -   **useLocalStorage.jsx:** A custom hook to manage state with local storage persistence.
    -   Other components: `MovieList`, `MovieDetails`, `Pagination`, `MyMovieListSummary`, `MyMovieListWrapper`, `BackToTop`, etc.

## API Key

The app uses a TMDB API key to fetch movie data. Replace the `api_key` value in `useMovies.js` with your own TMDB API key:

```js
const api_key = "YOUR_TMDB_API_KEY";
```

## How to Use

1. **Search for Movies:**  
   Type at least 3 characters in the search bar to see movie results.
2. **Pagination:**  
   Use the page numbers or the previous/next arrows to navigate between pages.
3. **Movie Details:**  
   Click on a movie card to view more details. In the details view, you can add the movie to your favorites list or close the details.
4. **Favorite Movies List:**  
   Added movies will appear in the favorite movies list, displaying each movie’s TMDB rating, your rating, and runtime.
5. **Back to Top:**  
   When you scroll down, the Back to Top button appears in the lower-right corner. Click it to quickly scroll to the top of the page.

## Technologies

-   **React:** For building the user interface.
-   **Bootstrap & Bootstrap Icons:** For styling and icons.
-   **Fetch API:** To retrieve data from the TMDB API.
-   **Custom React Hooks:** Like `useMovies`, `useMovieDetails`, and `useLocalStorage` to handle data fetching, state management, and local storage.

## Contributing

Contributions are welcome! If you find an issue or have suggestions for improvements, please open an issue or submit a pull request.

---

If you like this project, please give it a star to support it!
