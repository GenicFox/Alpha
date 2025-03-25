import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { categories } from './Explore';

function EnrollmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  // Find the course from our categories data
  const allCourses = categories.flatMap(category => category.courses);
  const course = allCourses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className="min-h-screen bg-primary-900 text-white">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <Link 
              to="/explore" 
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              Return to Explore
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Calculate course price based on level
  const price = course.level === 'Advanced' ? 299.99 : course.level === 'Intermediate' ? 199.99 : 99.99;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please sign in to enroll');
      navigate('/');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Here you would typically:
      // 1. Process payment
      // 2. Create enrollment record in database
      // 3. Grant course access to user
      
      toast.success('Successfully enrolled in the course!');
      navigate(`/course/${id}`);
    } catch (error) {
      toast.error('Failed to process enrollment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to={`/course/${id}`}
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-primary-800 rounded-xl p-6 border border-primary-700 mb-6">
                <h1 className="text-2xl font-bold mb-6">Enrollment Details</h1>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="font-semibold mb-4">Payment Method</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod('credit')}
                        className={`p-4 rounded-lg border transition-all ${
                          paymentMethod === 'credit'
                            ? 'border-accent-500 bg-accent-500/10'
                            : 'border-primary-700 hover:border-accent-500'
                        }`}
                      >
                        <CreditCard className={`w-6 h-6 mb-2 ${
                          paymentMethod === 'credit' ? 'text-accent-500' : 'text-gray-400'
                        }`} />
                        <span className="block font-medium">Credit Card</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-lg border transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-accent-500 bg-accent-500/10'
                            : 'border-primary-700 hover:border-accent-500'
                        }`}
                      >
                        <span className="block text-xl mb-2">PayPal</span>
                        <span className="block font-medium">Pay with PayPal</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'credit' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                              setFormData(prev => ({ ...prev, cardNumber: formatted }));
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                const formatted = value.length > 2 
                                  ? value.slice(0, 2) + '/' + value.slice(2)
                                  : value;
                                setFormData(prev => ({ ...prev, expiryDate: formatted }));
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            CVV
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              placeholder="123"
                              maxLength={3}
                              className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                              value={formData.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({ ...prev, cvv: value }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-2 rounded-lg bg-primary-900/50 border border-primary-700 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                            <span>Complete Enrollment</span>
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                        ) : (
                          'Pay with PayPal'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-primary-800 rounded-xl border border-primary-700 overflow-hidden sticky top-24">
                <div className="aspect-video">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold">${price}</span>
                    <span className="text-sm text-gray-400">One-time payment</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent-500" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent-500" />
                      <span>24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EnrollmentPage;