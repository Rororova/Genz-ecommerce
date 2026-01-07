import { Armchair, Briefcase, Coffee, HandCoins, Wrench, DollarSign } from 'lucide-react';


const techniques = [
    {
        id: 1,
        name: 'The Coach',
        icon: Armchair,
        description: 'Master the art of guidance and support. The Coach technique involves taking a mentoring role, providing encouragement and strategic advice while maintaining a comfortable distance. Perfect for those who prefer to observe and guide rather than directly participate. This approach emphasizes communication, trust-building, and creating a supportive environment where all parties feel valued and heard.',
        image: 'https://i.postimg.cc/R0Rxrt19/unnamed.jpg'
    },
    {
        id: 2,
        name: 'The Janitor',
        icon: Wrench,
        description: 'Clean up and maintain the situation with precision. The Janitor technique focuses on handling the aftermath with care and attention to detail. This method is all about being thorough, organized, and ensuring everything is left in perfect condition. Ideal for those who take pride in their meticulous nature and enjoy the satisfaction of a job well done.',
        image: 'https://i.postimg.cc/ryhy0Brk/unnamed.jpg'
    },
    {
        id: 3,
        name: 'The Drinker',
        icon: Coffee,
        description: 'Embrace the social aspect with relaxed confidence. The Drinker technique involves creating a casual, comfortable atmosphere where everyone can unwind and enjoy themselves. This approach emphasizes social lubricant, conversation, and building connections in a laid-back setting. Perfect for those who thrive in social situations and know how to keep the mood light and enjoyable.',
        image: 'https://i.postimg.cc/0QVvSSrp/unnamed.jpg'
    },
    {
        id: 4,
        name: 'The Beggar',
        icon: HandCoins,
        description: 'Approach with humility and genuine appreciation. The Beggar technique is about expressing sincere gratitude and acknowledging the privilege of the experience. This method emphasizes respect, humility, and showing appreciation for all involved. Ideal for those who understand the value of gratitude and aren\'t afraid to show vulnerability and appreciation.',
        image: 'https://i.postimg.cc/t43LP6MV/unnamed.jpg'
    },
    {
        id: 5,
        name: 'The Side Hustler',
        icon: DollarSign,
        description: 'Turn your passion into profit with entrepreneurial spirit. The Side Hustler technique involves monetizing the experience and creating value for all parties involved. This approach emphasizes business acumen, negotiation skills, and finding creative ways to generate income. Perfect for those with an entrepreneurial mindset who see opportunity in every situation and know how to create win-win scenarios.',
        image: 'https://i.postimg.cc/59mYPKFW/unnamed.jpg'
    }
];

export default function Techniques() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-20">
                    {/* Header Section */}
                    <section className="space-y-8">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Best Cuck Techniques 2025
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                                Master the art with our comprehensive guide to the most effective techniques for the modern era. Each approach offers unique benefits and can be tailored to your specific needs and preferences.
                            </p>
                        </div>

                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"
                                alt="Techniques overview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </section>

                    {/* Techniques List */}
                    <section className="space-y-16">
                        <h2 className="text-4xl font-bold text-gray-900">The Five Essential Techniques</h2>

                        {techniques.map((technique, index) => {
                            const Icon = technique.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={technique.id}
                                    className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}
                                >
                                    {/* Image */}
                                    <div className={`${!isEven ? 'md:col-start-2' : ''}`}>
                                        <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                                            <img
                                                src={technique.image}
                                                alt={technique.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`space-y-6 ${!isEven ? 'md:col-start-1 md:row-start-1' : ''}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900">{technique.name}</h3>
                                        </div>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            {technique.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* Comparison Grid */}
                    <section className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900">Quick Comparison</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techniques.map((technique) => {
                                const Icon = technique.icon;
                                return (
                                    <div key={technique.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Icon className="w-6 h-6 text-gray-900" />
                                            <h3 className="text-xl font-bold text-gray-900">{technique.name}</h3>
                                        </div>
                                        <p className="text-gray-700 text-sm line-clamp-3">
                                            {technique.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gray-900 text-white rounded-2xl p-12 space-y-6">
                        <h2 className="text-4xl font-bold">Ready to Master Your Technique?</h2>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Explore our premium collection of chairs designed to support every technique with comfort and style. Each piece is crafted to enhance your experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                Browse Collection
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
