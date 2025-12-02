import { useState } from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import type { Recipe, User } from '../App';
import { Progress } from './ui/progress';

interface HomeProps {
  user: User;
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Homemade Dumplings (饺子)',
    author: 'Wei Zhang',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1651399436026-3ca4088b3d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZHVtcGxpbmdzJTIwZm9vZHxlbnwxfHx8fDE3NjQ2Mzg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Chinese',
    ingredients: ['Ground pork', 'Cabbage', 'Dumpling wrappers', 'Soy sauce', 'Ginger'],
    steps: ['Mix filling', 'Wrap dumplings', 'Boil or pan-fry', 'Serve with dipping sauce'],
    likes: 245,
    comments: 32,
    timestamp: '2 hours ago',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Butter Chicken (मक्खन मुर्ग)',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMGRpc2h8ZW58MXx8fHwxNzY0NTUwNDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Indian',
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Garam masala'],
    steps: ['Marinate chicken', 'Cook in butter', 'Add cream sauce', 'Simmer until done'],
    likes: 189,
    comments: 24,
    timestamp: '5 hours ago',
    isLiked: true,
  },
  {
    id: '3',
    title: 'Street Tacos',
    author: 'Carlos Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc2NDYwOTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Mexican',
    ingredients: ['Corn tortillas', 'Beef', 'Cilantro', 'Onion', 'Lime'],
    steps: ['Season and cook meat', 'Warm tortillas', 'Assemble tacos', 'Top with cilantro and onion'],
    likes: 312,
    comments: 41,
    timestamp: '1 day ago',
    isLiked: false,
  },
  {
    id: '4',
    title: 'Carbonara Pasta',
    author: 'Marco Bianchi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc2NDU4NTgwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Pecorino cheese', 'Black pepper'],
    steps: ['Cook pasta', 'Fry pancetta', 'Mix eggs and cheese', 'Combine with pasta'],
    likes: 267,
    comments: 35,
    timestamp: '1 day ago',
    isLiked: true,
  },
];

export function Home({ user }: HomeProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  const handleLike = (recipeId: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
            }
          : recipe
      )
    );
  };

  const pointsToSteak = 100;
  const progressPercentage = (user.points / pointsToSteak) * 100;

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-[#8B4513]">Eamin's Kitchen</h1>
            <p className="text-[#A0522D]">Discover recipes from home</p>
          </div>
          <div className="flex items-center gap-2 bg-[#FFE8D6] px-3 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-[#8B4513]" />
            <span className="text-[#8B4513]">{user.points} pts</span>
          </div>
        </div>
        
        {/* Reward Progress */}
        <div className="bg-[#FFF8F0] p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#8B4513]" />
              <span className="text-[#8B4513]">Free Steak Reward</span>
            </div>
            <span className="text-[#A0522D]">{pointsToSteak - user.points} pts to go!</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </header>

      {/* Weekly Challenge */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] p-4 rounded-lg border border-[#DEB887]">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#8B4513]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#8B4513] mb-1">Weekly Challenge</h3>
            <p className="text-[#A0522D]">Upload 2 recipes this week to earn 10 bonus points!</p>
            <div className="mt-2 text-[#8B4513]">Progress: 1/2 recipes</div>
          </div>
        </div>
      </div>

      {/* Recipe Feed */}
      <div className="px-4 py-4 space-y-4">
        <h2 className="text-[#8B4513]">Community Recipes</h2>
        
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
