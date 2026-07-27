# Vault-X

**A modern financial dashboard and transaction management system** built with React, Vite, and Redux for seamless financial tracking, analysis, and decision-making.

Vault-X provides a comprehensive platform for managing financial transactions with advanced analytics, sandbox simulation mode, and an intuitive dashboard interface. Whether you're tracking spending patterns, analyzing financial velocity, or simulating budget allocations, Vault-X delivers powerful insights with a sleek, dark-mode UI.

## Features

- 📊 **Interactive Dashboard** - Real-time financial metrics and transaction visualization
- 📈 **Advanced Analytics** - Distribution mapping and burn-rate assessment
- 🎯 **Decision Matrix** - Strategic allocation tools and category spending analysis
- 💳 **Transaction Management** - Add, track, and manage financial transactions with ease
- 🧪 **Sandbox Simulator** - Test budget scenarios and allocations without affecting live data
- 📱 **Responsive Design** - Optimized for desktop and mobile viewing
- ⚡ **Fast & Modern** - Built on Vite with HMR for rapid development

## Tech Stack

- **Frontend Framework:** React 19 with Vite 7
- **State Management:** Redux Toolkit + React-Redux
- **Styling:** Tailwind CSS 4 + Framer Motion (animations)
- **Charts & Visualization:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite with SWC fast refresh

## Project Structure

```
Vault-X/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Sidebar, navigation components
│   │   ├── dashboard/       # Dashboard widgets (MetricCards, TransactionForm, etc.)
│   ├── features/            # Redux slices and business logic
│   ├── app/                 # Redux store configuration
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint rules
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MdAamerSk/Vault-X.git
cd Vault-X
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production-ready build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Code Quality

Run ESLint to check code standards:
```bash
npm lint
```

## Usage

- **Dashboard Tab** - View your main financial dashboard with metrics, transaction forms, and analytics
- **Analytics Tab** - Deep dive into spending distributions and financial analysis
- **Sandbox Mode** - Toggle sandbox mode to simulate budget scenarios without affecting live data
- **Transaction List** - Review and manage all your financial transactions

## Deployment

Vault-X can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
**Live Demo:** [Vault-X on Vercel](https://vault-x.vercel.app)

### Netlify
```bash
npm run build
```
Then deploy the `dist/` folder to Netlify

### GitHub Pages
Build the project and push the `dist/` folder to your `gh-pages` branch

### Docker
```bash
# Build Docker image
docker build -t vault-x .

# Run container
docker run -p 5173:5173 vault-x
```

## ESLint Configuration

For production applications, we recommend enabling type-aware lint rules:

```javascript
// eslint.config.js
import react from 'eslint-plugin-react'
import js from '@eslint/js'

export default [
  {
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: { react: { version: '19.1' } },
    plugins: { react },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
]
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feedback, please open an issue on [GitHub Issues](https://github.com/MdAamerSk/Vault-X/issues).

---

**Built with ❤️ by [MdAamerSk](https://github.com/MdAamerSk)**
