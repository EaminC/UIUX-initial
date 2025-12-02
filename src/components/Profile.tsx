import { Award, ChefHat, Star, Trophy, TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { User } from '../App';

interface ProfileProps {
  user: User;
}

const userRecipes = [
  {
    id: '1',
    title: 'Kung Pao Chicken',
    image: 'https://images.unsplash.com/photo-1651399436026-3ca4088b3d6e?w=400',
    likes: 89,
    points: 15,
  },
  {
    id: '2',
    title: 'Mapo Tofu',
    image: 'https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?w=400',
    likes: 67,
    points: 15,
  },
  {
    id: '3',
    title: 'Scallion Pancakes',
    image: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?w=400',
    likes: 103,
    points: 15,
  },
];

const achievements = [
  {
    title: 'First Recipe',
    description: 'Uploaded your first recipe',
    icon: ChefHat,
    earned: true,
  },
  {
    title: 'Early Adopter',
    description: 'Joined the community early',
    icon: Star,
    earned: true,
  },
  {
    title: 'Popular Chef',
    description: 'Get 100 total likes',
    icon: TrendingUp,
    earned: false,
    progress: 75,
  },
  {
    title: 'Recipe Master',
    description: 'Upload 10 recipes',
    icon: Award,
    earned: false,
    progress: 30,
  },
];

export function Profile({ user }: ProfileProps) {
  const pointsToSteak = 100;
  const progressPercentage = (user.points / pointsToSteak) * 100;

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4">
        <h1 className="text-[#8B4513]">Profile</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-lg p-6 border border-[#DEB887]">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-[#8B4513] mb-1">{user.name}</h2>
              <p className="text-[#A0522D] mb-3">From {user.country}</p>
              <div className="flex gap-2">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6]">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DEB887]">
            <div className="text-center">
              <div className="text-[#8B4513] text-2xl mb-1">{user.recipesUploaded}</div>
              <div className="text-[#A0522D]">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-[#8B4513] text-2xl mb-1">{user.points}</div>
              <div className="text-[#A0522D]">Points</div>
            </div>
            <div className="text-center">
              <div className="text-[#8B4513] text-2xl mb-1">259</div>
              <div className="text-[#A0522D]">Likes</div>
            </div>
          </div>
        </div>

        {/* Reward Progress */}
        <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] rounded-lg p-6 border border-[#DEB887]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-[#8B4513]">Free Premium Steak</h3>
              <p className="text-[#A0522D]">{pointsToSteak - user.points} points to go!</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-[#8B4513] mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 border ${
                    achievement.earned
                      ? 'border-[#8B4513] bg-[#FFF8F0]'
                      : 'border-[#DEB887]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      achievement.earned ? 'bg-[#FFE8D6]' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        achievement.earned ? 'text-[#8B4513]' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <h3
                    className={`mb-1 ${
                      achievement.earned ? 'text-[#8B4513]' : 'text-gray-600'
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-[#A0522D]">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-3">
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="text-[#A0522D] text-right mt-1">
                        {achievement.progress}%
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* My Recipes */}
        <div>
          <h2 className="text-[#8B4513] mb-4">My Recipes</h2>
          <div className="grid grid-cols-3 gap-3">
            {userRecipes.map((recipe) => (
              <div key={recipe.id} className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
                  <div className="text-white text-xs truncate">{recipe.title}</div>
                  <div className="text-white text-xs">♥ {recipe.likes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
