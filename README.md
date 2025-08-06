# Fatima AI Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Features a beautiful UI with dark/light mode, smooth animations, and comprehensive sections showcasing skills, experience, and projects.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Vite for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for consistent styling

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Modules
- **UI Components**: Radix UI, Shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Query
- **Icons**: Lucide React
- **Animations**: CSS Animations, Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/fatima-amani/fatima-ai-folio.git
cd fatima-ai-folio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🚀 Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Push to GitHub**: Simply push your changes to the `main` branch
2. **Automatic Deployment**: The GitHub Action will automatically build and deploy your site
3. **Access Your Site**: Your site will be available at `https://fatima-amani.github.io/fatima-ai-folio`

### Manual Deployment

If you prefer manual deployment:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Shadcn/ui components
│   └── ...            # Custom components
├── data/              # Portfolio data (JSON)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── main.tsx           # Application entry point
```

## 🎨 Customization

### Updating Portfolio Data

Edit `src/data/portfolio.json` to update your personal information, skills, experience, and projects.

### Styling

- **Colors**: Modify CSS variables in `src/index.css`
- **Components**: Update Shadcn/ui components in `src/components/ui/`
- **Layout**: Modify component structure in `src/components/`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 Live Demo

Visit the live portfolio: [https://fatima-amani.github.io/fatima-ai-folio](https://fatima-amani.github.io/fatima-ai-folio)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by Fatima Sayeed Amani
