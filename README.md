# Pace Calculator - Synthwave Runner

A running pace calculator with a retro synthwave aesthetic built with Next.js. Calculate your running pace, distance, or time by providing any two values.

## Features

- **Flexible Calculator**: Input any 2 of pace, distance, or time - the app calculates the third
- **Multiple Units**: Support for km/miles and min/km or min/mile
- **Results History**: View your last 5 calculations with highlighted calculated values
- **Synthwave Aesthetic**: Retro 80s neon glow effects, grid background, and scan lines
- **Mobile Responsive**: Works great on all screen sizes

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React 19

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

Build the static export:
```bash
npm run build
```

This creates a static export in the `out` directory, ready for deployment.

## Deploying to Azure Static Web Apps

### Prerequisites
- Azure account
- Azure CLI or use the Azure Portal

### Deployment Options

#### Option 1: Using Azure Portal (Recommended)

1. **Build the app locally**:
   ```bash
   npm run build
   ```

2. **Deploy via Azure Portal**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new "Static Web App" resource
   - Choose "Custom" for deployment source if deploying manually
   - Upload the contents of the `out` directory

#### Option 2: Using Azure Static Web Apps CLI

1. **Install the SWA CLI**:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Build the app**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   swa deploy ./out --deployment-token <YOUR_DEPLOYMENT_TOKEN>
   ```

#### Option 3: GitHub Actions (Automated)

1. **Push your code to GitHub**

2. **Create Azure Static Web App**:
   - In Azure Portal, create a new Static Web App
   - Connect to your GitHub repository
   - Use these build settings:
     - **App location**: `/`
     - **Api location**: `` (leave empty)
     - **Output location**: `out`
     - **Build command**: `npm run build`

3. Azure will automatically create a GitHub Actions workflow file in `.github/workflows/`

### Configuration Files

- `next.config.ts`: Configured with `output: 'export'` for static export
- `staticwebapp.config.json`: Azure Static Web Apps configuration for routing
- The app is fully static with no API routes, making it perfect for Azure Static Web Apps free tier

## How to Use

1. **Enter any 2 values**:
   - Pace (format: MM:SS, e.g., 5:30)
   - Distance (number, with km/miles selector)
   - Time (format: HH:MM:SS or MM:SS, e.g., 3:45:00)

2. **Click Calculate**: The app will solve for the missing third value

3. **View Results**: Your calculation appears in the results history below, with the calculated field highlighted in yellow

4. **Units**: Switch between km/miles for distance and min/km or min/mile for pace using the dropdown selectors

## Examples

### Calculate Pace
- Distance: 42.195 km (marathon)
- Time: 3:30:00
- Result: **Pace = 4:58 min/km**

### Calculate Distance
- Pace: 5:00 min/km
- Time: 1:00:00
- Result: **Distance = 12.00 km**

### Calculate Time
- Pace: 5:30 min/km
- Distance: 10 km
- Result: **Time = 55:00**

## Project Structure

```
pace-calc-fox/
├── app/
│   ├── globals.css          # Tailwind + Synthwave styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main calculator component
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── staticwebapp.config.json  # Azure SWA configuration
└── package.json
```

## License

ISC
