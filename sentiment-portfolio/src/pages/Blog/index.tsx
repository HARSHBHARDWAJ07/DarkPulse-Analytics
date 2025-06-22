import React from 'react';
import { Card } from '../../components/common/Card.tsx';

const blogPosts = [
  {
    id: '1',
    title: 'Building a Sentiment Analysis Tool with OpenAI',
    date: '2025-06-01',
    summary: 'A technical deep dive into integrating OpenAI with a modern React/Node stack.',
    url: '#'
  },
  {
    id: '2',
    title: 'Designing Accessible Dark UI with Tailwind CSS',
    date: '2025-05-15',
    summary: 'Best practices for dark, minimalist, and accessible web design.',
    url: '#'
  },
  // Add more posts as desired
];

export const Blog: React.FC = () => (
  <div className="min-h-screen py-12">
    <div className="max-w-4xl px-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Blog & Projects</h1>
      <div className="grid gap-6">
        {blogPosts.map(post => (
          <Card key={post.id} hover>
            <a href={post.url} className="block focus:outline-none">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{post.summary}</p>
                </div>
                <span className="mt-2 text-xs text-gray-400 sm:mt-0">{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
export default Blog;
