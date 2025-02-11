import React from 'react';

const Features = () => {
    const featuresList = [
        {
            title: 'AI-Powered Matching',
            description: 'Advanced algorithms that understand your preferences and personality for better matches',
            icon: '🤖',
        },
        {
            title: 'Compatibility Analysis',
            description: 'Deep analysis of compatibility factors including interests, values, and life goals',
            icon: '✨',
        },
        {
            title: 'Smart Recommendations',
            description: 'Personalized match suggestions that improve over time',
            icon: '💫',
        },
        {
            title: 'Secure Matching',
            description: 'Privacy-focused platform with verified profiles and secure communication',
            icon: '🔒',
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Why Choose Our AI Matchmaking?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Experience the future of relationships with our intelligent matching system
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {featuresList.map((feature, index) => (
                        <div
                            key={index}
                            className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;