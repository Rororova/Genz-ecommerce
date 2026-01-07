import { TreePine, Recycle, Zap, Users, TrendingUp, Target } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          <section className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Sustainability at Heart
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                We believe that beautiful design and environmental responsibility go hand in hand. Our commitment to sustainability isn't just good for the planet—it creates better products that last longer and bring more joy to our customers' lives.
              </p>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg"
                alt="Sustainable manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">2025 Impact Report</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: "45,000+", label: "kg CO2 Offset", icon: Zap },
                { number: "12,500+", label: "Trees Planted", icon: TreePine },
                { number: "78%", label: "Waste Diverted", icon: Recycle },
                { number: "100%", label: "Fair Trade Materials", icon: Users }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="p-8 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                    <Icon className="w-8 h-8 text-gray-900" />
                    <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                    <p className="text-gray-600 font-semibold">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Sustainability Pillars</h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Responsible Sourcing</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every material that goes into our chairs is carefully selected for both quality and environmental impact. We partner with suppliers who share our values and meet rigorous sustainability standards.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">FSC-Certified Wood</p>
                        <p className="text-gray-600">100% of our hardwood comes from sustainably managed forests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Ethically Sourced Leather</p>
                        <p className="text-gray-600">From certified tanneries with excellent environmental practices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Recycled Materials</p>
                        <p className="text-gray-600">We incorporate recycled fabrics, foams, and metals wherever possible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Non-Toxic Finishes</p>
                        <p className="text-gray-600">Water-based stains and finishes free from harmful chemicals</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3571215/pexels-photo-3571215.jpeg"
                    alt="Sustainable sourcing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                  <img
                    src="https://images.pexels.com/photos/3721930/pexels-photo-3721930.jpeg"
                    alt="Green manufacturing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-gray-900">Green Manufacturing</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our manufacturing partners operate with the highest environmental standards, minimizing waste and energy consumption while maintaining exceptional quality.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Carbon Neutral Facilities</p>
                        <p className="text-gray-600">Powered by renewable energy sources</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Zero Waste Goal</p>
                        <p className="text-gray-600">78% waste diversion achieved in 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Water Conservation</p>
                        <p className="text-gray-600">Advanced systems reduce water usage by 60%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Fair Labor Practices</p>
                        <p className="text-gray-600">Living wages and safe working conditions for all artisans</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Design for Longevity</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The most sustainable product is one that lasts. We design every chair to be timeless, durable, and maintainable, ensuring your investment brings joy for decades.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Timeless Design</p>
                        <p className="text-gray-600">Pieces that remain beautiful and relevant for generations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Premium Construction</p>
                        <p className="text-gray-600">Built to withstand years of regular use</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Repairable Parts</p>
                        <p className="text-gray-600">Easy access to replacement components</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Restoration Services</p>
                        <p className="text-gray-600">Professional refurbishment to extend product life</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3857671/pexels-photo-3857671.jpeg"
                    alt="Product longevity"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-12 space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Our 2030 Sustainability Goals</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  goal: "Carbon Negative Operations",
                  description: "Achieve carbon negative status across all operations through renewable energy and carbon offsetting programs"
                },
                {
                  goal: "100% Circular Materials",
                  description: "Use only recyclable or recycled materials in all chair components"
                },
                {
                  goal: "Zero Waste Manufacturing",
                  description: "Eliminate all manufacturing waste through advanced recycling and composting programs"
                },
                {
                  goal: "Global Supply Chain Transparency",
                  description: "Complete transparency and third-party verification of all supply chain practices"
                },
                {
                  goal: "Product Take-Back Program",
                  description: "Establish programs to recycle or refurbish end-of-life products"
                },
                {
                  goal: "Community Initiatives",
                  description: "Support 50+ community sustainability projects globally"
                }
              ].map((goal, index) => (
                <div key={index} className="space-y-3 p-6 bg-white rounded-lg border border-gray-200">
                  <Target className="w-6 h-6 text-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900">{goal.goal}</h3>
                  <p className="text-gray-700">{goal.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Transparency & Reporting</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We believe in accountability and transparency. Our annual sustainability reports detail our progress, challenges, and commitments. We welcome independent audits and third-party verification.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  year: 2024,
                  status: "Doesn't Exist",
                  link: "⭐⭐⭐",
                  metrics: "Carbon, Waste, Water, Labor"
                },
                {
                  year: 2023,
                  status: "Doesn't Exist",
                  link: "⭐⭐⭐",
                  metrics: "Carbon, Waste, Water, Labor"
                },
                {
                  year: 2022,
                  status: "Doesn't Exist",
                  link: "⭐⭐⭐",
                  metrics: "Carbon, Waste, Water, Labor"
                }
              ].map((report, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                  <p className="text-2xl font-bold text-gray-900">{report.year}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {report.status}
                  </span>
                  <p className="text-sm text-gray-600">Metrics: {report.metrics}</p>
                  <button className="text-gray-900 font-semibold hover:underline">
                    {report.link}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">How You Can Help</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Sustainability is a shared responsibility. Here's how our customers can support our mission while enjoying beautiful, durable furniture.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Care & Maintenance</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Follow our care guides to extend product life</li>
                  <li>• Use natural cleaning products</li>
                  <li>• Repair rather than replace when possible</li>
                  <li>• Take advantage of our restoration services</li>
                </ul>
              </div>
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Conscious Consumption</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Invest in quality over quantity</li>
                  <li>• Choose timeless designs</li>
                  <li>• Participate in our take-back program</li>
                  <li>• Share your sustainability story with us</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-2xl p-12 space-y-6">
            <h2 className="text-4xl font-bold">Join Our Sustainability Journey</h2>
            <p className="text-lg text-gray-300">
              Together, we can create a more sustainable future through conscious design and responsible production. Learn more about our initiatives and how you can support them.
            </p>
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
