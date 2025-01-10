# ShortenURL(server)

ShortenURL is a URL shortening service that allows you to create short, easy-to-share links.

## Features

- Shorten long URLs
- Track the number of clicks on each shortened URL
- Customizable short URLs

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/shortenurl.git
   ```
2. Navigate to the project server directory:
   ```sh
   cd shortenurl/server
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Navigate to the project client directory:
   ```sh
   cd shortenurl/client
   ```
5. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Navigate to the project server directory:
   ```sh
   cd shortenurl/server
   ```
2. Build server container:
   ```sh
   docker compose build
   ```
3. Start the server:
   ```sh
   docker compose up
   ```
4. Navigate to the project client directory:
   ```sh
   cd ..
   cd shortenurl/server
   ```
5. Run client:
   ```sh
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
