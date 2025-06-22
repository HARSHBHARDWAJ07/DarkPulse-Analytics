import React from 'react';
import { Card } from '../../components/common/Card.tsx';

const techStack = [
  { name: 'React', color: 'bg-blue-500', url: 'https://react.dev/' },
  { name: 'Node.js', color: 'bg-green-600', url: 'https://nodejs.org/' },
  { name: 'Express', color: 'bg-gray-800', url: 'https://expressjs.com/' },
  { name: 'MongoDB', color: 'bg-green-700', url: 'https://mongodb.com/' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500', url: 'https://tailwindcss.com/' },
  { name: 'TypeScript', color: 'bg-blue-700', url: 'https://www.typescriptlang.org/' },
  { name: 'Framer Motion', color: 'bg-pink-500', url: 'https://www.framer.com/motion/' },
];

export const About: React.FC = () => (
  <div className="min-h-screen py-12">
    <div className="max-w-3xl px-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">About Me &amp; This Project</h1>
      <Card>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Hi, I'm Harsh Bhardwaj</span> — a passionate Full stack Developer &amp; designer focused on building accessible, performant web applications with a modern stack.
          </p>
          <p>
            This portfolio demonstrates a full-stack sentiment analysis tool for social media, wrapped in a minimalist, dark-themed design. It highlights my skills in frontend, backend, and user-centered design.
          </p>
          <p>
            <span className="font-semibold">Key Features:</span>
            <ul className="mt-2 ml-4 text-gray-600 list-disc list-inside dark:text-gray-300">
              <li>Responsive, accessible UI with Tailwind CSS</li>
              <li>Live AI-powered sentiment analysis</li>
              <li>Secure authentication &amp; user dashboard</li>
              <li>Performance and accessibility best practices</li>
            </ul>
          </p>
        </div>
      </Card>
      <Card className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map(tech => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${tech.color} hover:opacity-80 transition`}
            >
              {tech.name}
            </a>
          ))}
        </div>
      </Card>
      <Card className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Credentials &amp; Links</h2>
        <ul className="space-y-2 text-blue-600 underline dark:text-blue-400">
          <li>
            <a href="https://github.com/yourusername/sentiment-portfolio" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </li>
          <li>
            <a href="mailto:hello@sentimentportfolio.com">Contact Email</a>
          </li>
        </ul>
      </Card>
    </div>
  </div>
);

export default About;
