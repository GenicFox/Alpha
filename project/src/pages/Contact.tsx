import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

function Contact() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please sign in to send a message');
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header currentPage="contact" />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions about our courses or career guidance? We're here to help you achieve your professional goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-primary-800 p-6 rounded-xl border border-primary-700">
              <Mail className="w-8 h-8 text-accent-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400">support@careerpath.com</p>
            </div>
            <div className="bg-primary-800 p-6 rounded-xl border border-primary-700">
              <Phone className="w-8 h-8 text-accent-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">1-800-CAREER-PATH</p>
            </div>
            <div className="bg-primary-800 p-6 rounded-xl border border-primary-700">
              <MapPin className="w-8 h-8 text-accent-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Office</h3>
              <p className="text-gray-400">123 Career Street, Success City, SC 12345</p>
            </div>
          </div>

          <div className="bg-primary-800 rounded-xl border border-primary-700 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <MessageSquare className="w-8 h-8 text-accent-500" />
              <h2 className="text-2xl font-bold">Send us a Message</h2>
            </div>

            {!session ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Please sign in to send us a message</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-accent-500 text-primary-900 px-6 py-2 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-500 text-primary-900 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;