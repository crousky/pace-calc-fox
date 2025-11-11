# Pace Calculator - Synthwave Edition

A Blazor WebAssembly pace calculator for running races with a stunning synthwave aesthetic. Calculate pace, distance, or time by entering any two values.

## Features

- **Smart Calculator**: Input any 2 of pace, distance, and time - automatically calculates the third
- **Multiple Input Formats**:
  - Pace: MM:SS (e.g., 5:30) or decimal minutes (e.g., 5.5)
  - Distance: Kilometers (e.g., 42.195 for marathon)
  - Time: HH:MM:SS (e.g., 3:45:30) or MM:SS or decimal minutes
- **Synthwave Aesthetic**: Neon colors, animated grid background, and retro-futuristic design
- **Results History**: Displays the last 5 calculations (stored in JavaScript memory)
- **Responsive Design**: Works on desktop and mobile devices

## Local Development

### Prerequisites

- .NET 8.0 SDK or later

### Running Locally

```bash
cd PaceCalc
dotnet run
```

The application will be available at `https://localhost:5001` (or the port shown in the console).

### Building for Production

```bash
cd PaceCalc
dotnet publish -c Release
```

The output will be in `PaceCalc/bin/Release/net8.0/publish/wwwroot/`

## Deploying to Azure Static Web Apps

### Option 1: Using GitHub Actions (Recommended)

1. Create an Azure Static Web App in the Azure Portal
2. During creation, connect it to your GitHub repository
3. Azure will automatically create a workflow file or you can use the one provided in `.github/workflows/azure-static-web-apps.yml`
4. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your GitHub repository
5. Push to the main branch to trigger deployment

### Option 2: Using Azure CLI

```bash
# Build the project
cd PaceCalc
dotnet publish -c Release

# Deploy using Azure CLI
az staticwebapp create \
  --name pace-calculator \
  --resource-group <your-resource-group> \
  --source ./bin/Release/net8.0/publish/wwwroot \
  --location <your-location> \
  --branch main \
  --app-location "/PaceCalc" \
  --output-location "wwwroot"
```

## How to Use

1. Enter any **two** values:
   - **Pace**: Your running pace in minutes per kilometer
   - **Distance**: The race distance in kilometers
   - **Time**: Your target or actual time

2. Click **Calculate** to compute the missing value

3. View your past 5 calculations in the "Recent Calculations" section

### Examples

**Example 1: Calculate pace from time and distance**
- Distance: 42.195 km (marathon)
- Time: 3:45:30
- Result: Pace calculated as 5:20 min/km

**Example 2: Calculate time from pace and distance**
- Pace: 5:00 min/km
- Distance: 10 km
- Result: Time calculated as 50:00

**Example 3: Calculate distance from pace and time**
- Pace: 6:00 min/km
- Time: 1:00:00
- Result: Distance calculated as 10.00 km

## Technical Stack

- **Frontend**: Blazor WebAssembly (C#)
- **Styling**: Custom CSS with Synthwave theme
- **Font**: Orbitron (Google Fonts)
- **Storage**: JavaScript in-memory storage (no cookies or localStorage)
- **Hosting**: Azure Static Web Apps

## Project Structure

```
PaceCalc/
├── Pages/
│   └── Index.razor           # Main calculator component
├── wwwroot/
│   ├── css/
│   │   └── app.css          # Synthwave styling
│   ├── js/
│   │   └── calculator.js    # In-memory storage
│   ├── index.html           # Entry point
│   └── staticwebapp.config.json  # Azure SWA configuration
├── _Imports.razor           # Common Blazor imports
├── App.razor                # Root component
├── Program.cs               # Application entry point
└── PaceCalc.csproj         # Project file
```

## License

MIT