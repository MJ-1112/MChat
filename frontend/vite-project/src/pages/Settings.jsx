import React from 'react'
import Homebar from './Homebar'


const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald",
  "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury",
  "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim",
  "nord", "sunset", "caramellatte", "abyss", "silk"
];
function Settings() {
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // optional: remember theme
  };
  return (
         <div>
          <Homebar/>
      <h1 className="text-3xl font-bold mb-6 text-center">Choose a Theme</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {themes.map((theme) => (
          <div
            key={theme}
            onClick={() => applyTheme(theme)}
            className="cursor-pointer rounded-lg overflow-hidden border border-base-300 shadow-md hover:scale-105 transition-transform"
          >
            <div data-theme={theme} className="w-full p-3 flex gap-1">
              <div className="w-1/3 h-10 rounded bg-primary" />
              <div className="w-1/3 h-10 rounded bg-secondary" />
              <div className="w-1/3 h-10 rounded bg-accent" />
            </div>
            <div className="text-center py-2 font-medium capitalize">
              {theme}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings