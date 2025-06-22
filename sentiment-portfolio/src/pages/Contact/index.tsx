import React, { useState } from 'react';
import { Card } from '../../components/common/Card.tsx';
import { Input } from '../../components/common/input.tsx';
import { Textarea } from '../../components/common/Textarea.tsx';
import { Button } from '../../components/common/Button.tsx';
import { api } from '../../services/api.ts';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/contact', form);
      setSent(true);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-lg px-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Contact</h1>
        <Card>
          {sent ? (
            <div className="py-8 text-center text-green-600">Thank you! Your message has been sent.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <Button type="submit" isLoading={loading} fullWidth>
                Send Message
              </Button>
            </form>
          )}
        </Card>
        <div className="mt-8 text-center text-gray-500">
          Or email: <a href="mailto:hello@sentimentportfolio.com" className="underline text-primary-600 dark:text-primary-400">hello@sentimentportfolio.com</a>
        </div>
      </div>
    </div>
  );
};
export default Contact;
