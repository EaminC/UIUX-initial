import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { UploadRecipe } from './components/UploadRecipe';
import { Profile } from './components/Profile';
import { IngredientStore } from './components/IngredientStore';
import { Navigation } from './components/Navigation';

export type Screen = 'onboarding' | 'home' | 'upload' | 'store' | 'profile';

export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  cuisine: string;
  ingredients: string[];
  steps: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface User {
  name: string;
  country: string;
  avatar: string;
  points: number;
  recipesUploaded: number;
  badges: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [user, setUser] = useState<User>({
    name: 'Yiming Cheng',
    country: 'China',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    points: 45,
    recipesUploaded: 3,
    badges: ['First Recipe', 'Early Adopter'],
  });

  const handleCompleteOnboarding = (userName: string, country: string) => {
    setUser({ ...user, name: userName, country });
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleRecipeUpload = (points: number) => {
    setUser({
      ...user,
      points: user.points + points,
      recipesUploaded: user.recipesUploaded + 1,
    });
    setCurrentScreen('home');
  };

  if (!hasCompletedOnboarding && currentScreen === 'onboarding') {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20">
      {currentScreen === 'home' && <Home user={user} />}
      {currentScreen === 'upload' && (
        <UploadRecipe onComplete={handleRecipeUpload} onCancel={() => setCurrentScreen('home')} />
      )}
      {currentScreen === 'store' && <IngredientStore />}
      {currentScreen === 'profile' && <Profile user={user} />}
      
      <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
