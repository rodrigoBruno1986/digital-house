import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/app/globals.css'
import { QueryProvider } from '../src/providers/QueryProvider'
import { Toaster } from 'react-hot-toast'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <div className={`${inter.variable} ${poppins.variable} antialiased`}>
        <QueryProvider>
          <Story />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </QueryProvider>
      </div>
    ),
  ],
};

export default preview;