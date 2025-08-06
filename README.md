# Fatima AI Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Live Demo

Visit the live portfolio at: [https://fatima-amani.github.io/fatima-ai-folio](https://fatima-amani.github.io/fatima-ai-folio)

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Router** - Client-side routing
- **React Query** - Data fetching
- **Lucide React** - Icons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/fatima-amani/fatima-ai-folio.git
cd fatima-ai-folio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

This project is configured for GitHub Pages deployment using the `gh-pages` branch.

### Automatic Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This command will:
1. Build the project for production
2. Deploy the built files to the `gh-pages` branch
3. Make the site available at `https://fatima-amani.github.io/fatima-ai-folio`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select `gh-pages` branch
5. Save the settings

### Build Configuration

The project is configured with:
- Base path: `/fatima-ai-folio/` (for GitHub Pages)
- HashRouter for client-side routing
- 404.html for SPA routing support

## 🐛 Troubleshooting

### White Screen Issues
- Ensure the base path is correctly set in `vite.config.ts`
- Check that all assets are loading correctly
- Verify the GitHub Pages branch is set to `gh-pages`

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear the `dist` folder and rebuild: `rm -rf dist && npm run build`
- Check for TypeScript errors: `npm run lint`

### Routing Issues
- The project uses HashRouter for better GitHub Pages compatibility
- 404.html file handles SPA routing redirects

## 📁 Project Structure

```
fatima-ai-folio/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── data/          # Static data
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities
│   └── ui/            # Shadcn/ui components
├── public/            # Static assets
├── dist/              # Build output
└── package.json       # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
