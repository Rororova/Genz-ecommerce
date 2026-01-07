import { Lightbulb, Hammer, Globe, Heart } from 'lucide-react';

export default function DesignPhilosophy() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          <section className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Design Philosophy
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                At Cuck Chair Architect, design is not about aesthetics alone—it's about creating functional art that enhances human experience. Our design philosophy is rooted in the belief that great furniture solves problems while inspiring the soul.
              </p>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.open.edu%2Fopenlearn%2Fpluginfile.php%2F766142%2Ftool_ocwmanage%2Fimage%2F0%2Fa211_1_cover_image_1.jpg&f=1&nofb=1&ipt=f26432e71bf4744c7d459fcf9f4058f42a204ab7605711fedaacb0dfb8d08b92"
                alt="Design studio workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Design Pillars</h2>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-8 h-8 text-gray-900 flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900">Conceptual Integrity</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every design starts with a core concept. We define the problem, understand the user, and develop a singular, powerful idea that drives every decision. This ensures cohesion and purpose throughout the entire piece.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Deep user research and empathy mapping</li>
                    <li>Problem statement definition</li>
                    <li>Iterative prototyping and refinement</li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3861967/pexels-photo-3861967.jpeg"
                    alt="Conceptual design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                  <img
                    src="https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg"
                    alt="Ergonomic design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 order-1 md:order-2">
                  <div className="flex items-center gap-3">
                    <Hammer className="w-8 h-8 text-gray-900 flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900">Ergonomic Excellence</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Form is beautiful only when it serves human comfort. We collaborate with ergonomic specialists to ensure every chair supports the body through extended use, whether for work, relaxation, or dining.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Advanced biomechanical analysis</li>
                    <li>Long-term comfort testing</li>
                    <li>Accessibility considerations</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-gray-900 flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900">Material Honesty</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We believe materials should express their true nature. We celebrate the warmth of wood, the durability of steel, the softness of quality fabrics, and the elegance of leather. No disguises, no shortcuts.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Sourcing premium, sustainable materials</li>
                    <li>Highlighting natural qualities</li>
                    <li>Minimal finishing for authenticity</li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3587627/pexels-photo-3587627.jpeg"
                    alt="Material details"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                  <img
                    src="https://images.pexels.com/photos/3929857/pexels-photo-3929857.jpeg"
                    alt="Timeless design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 order-1 md:order-2">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-gray-900 flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900">Timeless Design</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We design for permanence, not trends. Our collections should feel as relevant in 20 years as they do today. This means focusing on proportion, balance, and archetypal forms that transcend time.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Classic proportions and geometry</li>
                    <li>Durability that lasts generations</li>
                    <li>Resistance to stylistic obsolescence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-12 space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Design Process</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  number: "01",
                  title: "Research",
                  description: "Deep dive into user needs, market trends, and technical possibilities"
                },
                {
                  number: "02",
                  title: "Conceptualization",
                  description: "Develop core design concepts and define the guiding principles"
                },
                {
                  number: "03",
                  title: "Prototyping",
                  description: "Create multiple prototypes to explore form, function, and materials"
                },
                {
                  number: "04",
                  title: "Refinement",
                  description: "Test, iterate, and perfect every detail through user feedback"
                },
                {
                  number: "05",
                  title: "Production",
                  description: "Collaborate with artisans to ensure quality in manufacturing"
                }
              ].map((step, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-3xl font-bold text-gray-300">{step.number}</p>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Sustainability Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sustainable design isn't an afterthought—it's embedded in our DNA. From material sourcing to manufacturing to end-of-life considerations, we design with environmental responsibility in mind.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Materials</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• FSC-certified sustainable hardwoods</li>
                  <li>• Recycled and recyclable materials</li>
                  <li>• Non-toxic finishes and adhesives</li>
                  <li>• Ethically sourced leather from certified tanneries</li>
                </ul>
              </div>
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Manufacturing</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Carbon-neutral production facilities</li>
                  <li>• Zero-waste manufacturing processes</li>
                  <li>• Fair trade practices with partners</li>
                  <li>• Minimal transportation footprint</li>
                </ul>
              </div>
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Longevity</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Designed to last decades</li>
                  <li>• Repairable and upgradeable components</li>
                  <li>• Timeless aesthetics resist obsolescence</li>
                  <li>• Take-back programs for recycling</li>
                </ul>
              </div>
              <div className="space-y-4 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Impact</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Reduced environmental footprint per product</li>
                  <li>• Support for reforestation initiatives</li>
                  <li>• Annual sustainability reporting</li>
                  <li>• Commitment to continuous improvement</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Inspiration & Influences</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our designs draw inspiration from diverse sources: architectural movements, natural forms, craft traditions, and contemporary innovations. We believe in standing on the shoulders of giants while pushing forward.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  era: "Bauhaus",
                  influence: "The marriage of form and function, reduction to essentials, and the belief that good design is democratic"
                },
                {
                  era: "Mid-Century Modern",
                  influence: "Organic curves, innovative materials, and the balance between minimalism and warmth"
                },
                {
                  era: "Japanese Craftsmanship",
                  influence: "Attention to detail, respect for materials, and the concept of 'wabi-sabi' beauty"
                },
                {
                  era: "Scandinavian Design",
                  influence: "Simplicity, functionality, and creating comfortable spaces for everyday living"
                },
                {
                  era: "Contemporary Innovation",
                  influence: "New technologies, sustainable practices, and evolving user needs"
                },
                {
                  era: "Nature",
                  influence: "Organic forms, sustainable systems, and the inherent beauty of natural patterns"
                }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.era}</h3>
                  <p className="text-gray-700">{item.influence}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-2xl p-12 space-y-6">
            <h2 className="text-4xl font-bold">Experience Our Philosophy</h2>
            <p className="text-lg text-gray-300">
              Visit one of our showrooms or experience our collections online. Sit in our chairs, feel the materials, and understand how design philosophy translates into lived experience.
            </p>
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              View Collection
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
