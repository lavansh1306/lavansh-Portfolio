import React from 'react';
import { Card, CardContent } from './ui/card';

export const AchievementsSection = () => {
  const achievements = [
    {
      title: 'Technical Leadership',
      metrics: [
        { label: 'Projects Delivered', value: '50+' },
        { label: 'Team Size Led', value: '15+' },
        { label: 'Success Rate', value: '100%' }
      ]
    },
    {
      title: 'Innovation Impact',
      metrics: [
        { label: 'Patents Filed', value: '3' },
        { label: 'Research Papers', value: '5' },
        { label: 'Open Source Contributions', value: '200+' }
      ]
    },
    {
      title: 'Recognition',
      metrics: [
        { label: 'Industry Awards', value: '7' },
        { label: 'Speaking Engagements', value: '12' },
        { label: 'Hackathon Wins', value: '4' }
      ]
    }
  ];

  const awards = [
    {
      title: 'Technical Excellence Award',
      organization: 'Google Developer Conference 2024',
      description: 'Recognized for outstanding contributions in AI/ML development'
    },
    {
      title: 'Innovation Champion',
      organization: 'AWS re:Invent 2024',
      description: 'Best implementation of cloud-native architecture'
    },
    {
      title: 'Top Contributor',
      organization: 'GitHub Open Source',
      description: 'Among top 1% contributors in AI/ML repositories'
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Professional Excellence
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A track record of delivering impactful solutions and earning industry recognition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((category, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.metrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-400">{metric.label}</span>
                      <span className="text-2xl font-bold text-blue-400">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                </div>
                <p className="text-blue-400 mb-2">{award.organization}</p>
                <p className="text-gray-400">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
