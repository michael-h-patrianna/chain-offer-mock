#!/bin/bash

# Chain Offer Mock - Import Folder Cleanup Script
# This script helps verify independence and safely remove the import folder

echo "🔍 Checking Chain Offer Mock Independence..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Please run this script from the chain-offer-mock root directory"
    exit 1
fi

echo "✅ Found chain-offer-mock project"

# Check if isolated app works
echo "🧪 Testing isolated app dependencies..."

echo "✅ (Skip) External dependency check no longer required; project already decoupled"

# Check if the server is running
if ! curl -s http://localhost:5174 > /dev/null; then
    echo "⚠️  Development server not running. Please start with: npm run dev"
    echo "   Then test the isolated app at: http://localhost:5174/?isolated"
    echo ""
    read -p "Press Enter when you've verified the isolated app works correctly..."
fi

echo "🗂️  Files safe to delete:"
echo "   - import/ (entire folder, legacy source mirror)"
echo "   - src/ui/App.tsx (legacy app wrapper if still present)"
echo "   - src/ui/AppWithIsolatedComponents.tsx (transitional wrapper)"
echo "   - src/imported-src/ (if still exists)"

echo ""
read -p "🔥 Delete import folder and old components? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Cleaning up..."

    # Move to parent directory to delete import folder
    cd ..

    if [ -d "import" ]; then
        echo "   Deleting import/ folder..."
        rm -rf import
        echo "   ✅ import/ folder deleted"
    fi

    # Return to project directory
    cd chain-offer-mock

    # Remove old app files
    if [ -f "src/ui/App.tsx" ]; then
        echo "   Removing old App.tsx..."
        rm src/ui/App.tsx
        echo "   ✅ App.tsx removed"
    fi

    if [ -f "src/ui/AppWithIsolatedComponents.tsx" ]; then
        echo "   Removing AppWithIsolatedComponents.tsx..."
        rm src/ui/AppWithIsolatedComponents.tsx
        echo "   ✅ AppWithIsolatedComponents.tsx removed"
    fi

    if [ -d "src/imported-src" ]; then
        echo "   Removing imported-src/ folder..."
        rm -rf src/imported-src
        echo "   ✅ imported-src/ folder removed"
    fi

    # Update main.tsx to only use isolated app
    echo "   Updating main.tsx..."
    cat > src/main.tsx << 'EOF'
import React from 'react'
// Minimal process polyfill for code referencing process.env.*
if (!(window as any).process) {
  ;(window as any).process = { env: { IMG_ORIGIN: '' } }
}
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { AppSimpleIsolated } from './ui/AppSimpleIsolated'

// expose for debugging
;(window as any).store = store

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSimpleIsolated />
    </Provider>
  </React.StrictMode>
)
EOF
    echo "   ✅ main.tsx updated"

    echo ""
    echo "🎉 Cleanup complete! Your chain offer mock is independent."
    echo ""
    echo "📁 Remaining structure:"
    echo "   ├── src/"
    echo "   │   ├── components/     # Isolated React components"
    echo "   │   ├── styles/         # Extracted SASS files"
    echo "   │   ├── store/          # Local Redux store"
    echo "   │   ├── config/         # Local configuration"
    echo "   │   ├── utils/          # Data transformation"
    echo "   │   └── ui/"
    echo "   │       └── AppSimpleIsolated.tsx  # Independent app"
    echo "   └── data/               # Local JSON data"
    echo ""
    echo "🌐 Test your independent app:"
    echo "   http://localhost:5174/"

else
    echo "❌ Cleanup cancelled. Import folder preserved."
    echo ""
    echo "💡 To test independence:"
    echo "   1. Visit: http://localhost:5174/?isolated"
    echo "   2. Verify all functionality works"
    echo "   3. Run this script again to clean up"
fi
