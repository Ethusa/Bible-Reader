/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#F7F5F0',
          dark: '#171715'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#201F1C'
        },
        mutedSurface: {
          light: '#F0EDE7',
          dark: '#2A2925'
        },
        border: {
          light: '#E6E1D8',
          dark: '#35332E'
        },
        txt: {
          primaryLight: '#22211F',
          primaryDark: '#F1EEE6',
          secondaryLight: '#716E68',
          secondaryDark: '#AAA69D'
        },
        track: {
          nt: '#536B92',
          ot: '#A57846',
          psalms: '#67806D',
          proverbs: '#A56359',
          success: '#668269'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};
