'use client';

import { useState, useEffect } from 'react';
import AppNavigation from './components/AppNavigation';
import PasswordIndicator from './components/PasswordIndicator';
import { Eye } from 'lucide-react';

export default function Home() {
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState('idle');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value === '') {
      setActive('idle');
    }
    if (value.length > 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  return (
    <main className="grid place-items-center min-h-svh bg-gray-100">
      <div className="sm:max-w-[400px] h-full sm:h-[800px] p-8 bg-white rounded-3xl shadow">
        <AppNavigation />

        <h1 className="text-2xl font-bold mb-2">Set Password</h1>

        <form action="" className="min-h-96 flex flex-col justify-between">
          <div>
            <h2 className="text-gray-500 mb-4">Choose a password.</h2>

            <div className="relative flex items-center mb-2">
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoFocus
                autoComplete="off"
                className="w-full h-12 placeholder:font-semibold placeholder:text-gray-300 focus-visible:outline-none caret-blue-400 placeholder:text-lg"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (e.target.value.length > 0 && e.target.value.length <= 6) {
                    setActive('weak');
                  }
                  if (e.target.value.length > 6) {
                    setActive('strong');
                  }
                }}
              />
              <Eye className="text-gray-300 absolute right-0" />
            </div>

            <PasswordIndicator active={active} />

            <p className="mt-4 text-xs text-gray-400">
              Strong passwords are often 10 characters or more and include a
              special character and a number.
            </p>
          </div>

          <button
            disabled={disabled}
            type="button"
            className="rounded-full w-full h-12 bg-sky-400 text-white font-semibold disabled:opacity-50 transition-opacity"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
