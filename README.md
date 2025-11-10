# Running Pace Calculator

A modern, clean running pace calculator built with Next.js that helps runners calculate pace, distance, or time for their races.

## Features

- **Flexible Calculations**: Input any 2 values (pace, distance, or time) to automatically calculate the third
- **Unit Support**: Toggle between kilometers and miles
- **Recent History**: View your last 5 calculations (stored in memory)
- **Modern UI**: Clean, responsive design with dark mode support
- **Static Export**: Optimized for Azure Static Web Apps deployment

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the static site for production:

```bash
npm run build
```

This will generate a static export in the `out` directory.

## Deployment to Azure Static Web Apps

This application is configured for Azure Static Web Apps deployment with static export.

### Using Azure Portal

1. Push your code to a Git repository (GitHub, Azure DevOps, etc.)
2. In Azure Portal, create a new Static Web App
3. Connect your repository
4. Set build configuration:
   - **App location**: `/`
   - **Output location**: `out`
   - **Build command**: `npm run build`

### Using Azure CLI

```bash
# Build the static site
npm run build

# Deploy using Azure CLI (install if needed: npm install -g @azure/static-web-apps-cli)
swa deploy ./out --deployment-token <your-deployment-token>
```

## How to Use

1. **Select Unit**: Choose between kilometers or miles
2. **Enter Values**: Input any 2 of the following:
   - **Pace**: Minutes per kilometer/mile (format: MM:SS, e.g., 5:30)
   - **Distance**: Total distance in km or miles (e.g., 42.195 for a marathon)
   - **Time**: Total time (format: HH:MM:SS or MM:SS, e.g., 3:45:00)
3. **Calculate**: Click the Calculate button to solve for the missing value
4. **View History**: See your recent calculations below the calculator

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Azure Static Web Apps (static export)

## License

MIT
