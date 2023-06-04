<div align="center">
<a href="https://myleaguecard.com/">
<img src="./src/assets/logo.png" alt="League Of Legend Player Card" />
</a>

<img src='https://media.giphy.com/media/kxbIch2AXOKnbra74z/giphy.gif' alt='League Of Legend myLeagueCard' width="100%"  />

## Project Description

myLeagueCard is an innovative and user-friendly web application, specifically designed for League of Legends players seeking to showcase their in-game prowess and achievements.

Using Riot's API, myLeagueCard fetches and processes user's game data to present a comprehensive summary of the player's performance, including win rates, losses, and their top 3 champion masteries.

Users can further customize their profile card by selecting their favorite champion as the card's background, and can download the card as a PNG file to share with the community.

</div>

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/John4E656F/myleaguecard.git
   ```

2. Install the dependencies:

   ```
   yarn install
   ```

3. Obtain a developer API key from Riot Games:

   Visit the [Riot Developer Portal](https://developer.riotgames.com/), sign in with your account and register a project to obtain your API key.

4. Configure your Riot API key:

   Open the `.env` file in the root directory of your project. Insert your key as the value of `VITE_API`. Be careful not to commit this file to your public repository.

   ```
   VITE_API=your-riot-api-key
   ```

5. Start the application:
   ```
   yarn dev
   ```

## Features

- Fetch and display user data from Riot's API
- Calculate win rates and other stats
- Display top 3 champion masteries
- Allow users to select their main champion as the card's background
- Downloadable profile card as PNG file

## Built With

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux.js.org/introduction/getting-started)
- [Riot API](https://developer.riotgames.com/apis)
- [Axios](https://axios-http.com/)
- [File-Saver](https://github.com/eligrey/FileSaver.js/)
- [html-to-image](https://www.npmjs.com/package/html-to-image)

## Development Tools & Dependencies

- [Vite](https://vitejs.dev/)
- [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react)
- [ESLint](https://eslint.org/)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](contributing.md) first.

## License

[MIT](LICENSE)
