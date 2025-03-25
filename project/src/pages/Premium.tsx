import React from 'react';
import { Crown, Check, Zap, Star, Shield, Rocket, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import Header from '../components/Header';

interface PricingTier {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

function Premium() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers: PricingTier[] = [
    {
      name: "Basic",
      monthlyPrice: "$9.99",
      yearlyPrice: "$99.99",
      description: "Perfect for getting started with premium features",
      features: [
        "Access to all basic challenges",
        "Progress tracking",
        "Community forum access",
        "Email support",
        "Basic analytics",
        "Up to 3 study sessions per day"
      ]
    },
    {
      name: "Pro",
      monthlyPrice: "$19.99",
      yearlyPrice: "$199.99",
      description: "Advanced features for serious learners",
      features: [
        "Everything in Basic",
        "Advanced challenges",
        "Priority support",
        "Personalized learning path",
        "Advanced progress analytics",
        "Team collaboration",
        "Unlimited study sessions",
        "Custom learning tracks"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: "$49.99",
      yearlyPrice: "$499.99",
      description: "Complete solution for teams and organizations",
      features: [
        "Everything in Pro",
        "Custom challenges",
        "Dedicated support",
        "Team management",
        "API access",
        "Custom integrations",
        "Advanced analytics",
        "White-label options",
        "Custom training sessions",
        "Enterprise SSO"
      ]
    }
  ];

  const calculateSavings = (monthlyPrice: string, yearlyPrice: string) => {
    const monthly = parseFloat(monthlyPrice.replace('$', ''));
    const yearly = parseFloat(yearlyPrice.replace('$', ''));
    const annualCost = monthly * 12;
    const savings = ((annualCost - yearly) / annualCost) * 100;
    return Math.round(savings);
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent-500/10 px-4 py-2 rounded-full text-accent-500 mb-6">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Premium Features</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Unlock Your Full Potential</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your learning journey and access exclusive features.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-primary-800 rounded-full p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-accent-500 text-primary-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all flex items-center space-x-2 ${
                billingCycle === 'yearly'
                  ? 'bg-accent-500 text-primary-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-xs px-2 py-1 bg-yellow-400 text-primary-900 rounded-full font-medium">
                Save up to 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative bg-primary-800 rounded-2xl p-8 border ${
                tier.isPopular ? 'border-accent-500' : 'border-primary-700'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-accent-500 text-primary-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="p-2 bg-primary-900/50 rounded-lg">
                  {tier.name === "Basic" && <Star className="w-5 h-5 text-accent-500" />}
                  {tier.name === "Pro" && <Shield className="w-5 h-5 text-accent-500" />}
                  {tier.name === "Enterprise" && <Rocket className="w-5 h-5 text-accent-500" />}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">
                    {billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                  <span className="text-gray-400 ml-2">
                    / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className="flex items-center space-x-2 text-sm text-yellow-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Save {calculateSavings(tier.monthlyPrice, tier.yearlyPrice)}%</span>
                  </div>
                )}
                <p className="text-gray-400">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                tier.isPopular
                  ? 'bg-accent-500 text-primary-900 hover:bg-accent-400'
                  : 'bg-primary-900/50 text-white hover:bg-primary-700'
              }`}>
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-primary-800 rounded-2xl p-8 border border-primary-700 max-w-4xl mx-auto">
          <div className="flex items-start space-x-6">
            <div className="p-3 bg-accent-500/10 rounded-xl">
              <Zap className="w-8 h-8 text-accent-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Need a custom plan?</h2>
              <p className="text-gray-400 mb-4">
                We offer custom solutions for organizations with specific requirements. Contact us to discuss your needs.
              </p>
              <button className="inline-flex items-center space-x-2 text-accent-500 hover:text-accent-400 transition-colors">
                <span>Contact Sales</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Premium;