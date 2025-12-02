import { Home, PlusCircle, ShoppingBag, User } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'upload' as Screen, icon: PlusCircle, label: 'Upload' },
    { id: 'store' as Screen, icon: ShoppingBag, label: 'Store' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DEB887] shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? 'text-[#8B4513]' : 'text-[#A0522D]'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#8B4513]' : 'text-[#A0522D]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
