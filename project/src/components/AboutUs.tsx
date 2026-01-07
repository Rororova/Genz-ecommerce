import { Award, Leaf, Users, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          <section className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About Cuck Chair Architect
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                We believe that where you sit defines how you live. Since our founding in 2015, we've been dedicated to creating exceptional chairs that blend architectural precision with uncompromising comfort. Every piece in our collection tells a story of meticulous craftsmanship and design innovation.
              </p>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3938021/pexels-photo-3938021.jpeg"
                alt="Our design studio"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To revolutionize the way people think about seating by combining timeless design principles with modern ergonomic science. We're committed to creating furniture that doesn't just look beautiful—it transforms the spaces we inhabit and enhances the way we live, work, and relax.
            </p>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-gray-50 rounded-xl">
                <Award className="w-10 h-10 text-gray-900" />
                <h3 className="text-2xl font-bold text-gray-900">Design Excellence</h3>
                <p className="text-gray-700">
                  Every chair is designed by award-winning architects and designers who push the boundaries of what's possible in contemporary furniture design.
                </p>
              </div>

              <div className="space-y-4 p-8 bg-gray-50 rounded-xl">
                <Leaf className="w-10 h-10 text-gray-900" />
                <h3 className="text-2xl font-bold text-gray-900">Sustainability</h3>
                <p className="text-gray-700">
                  We source eco-friendly materials and employ sustainable manufacturing practices to minimize our environmental footprint.
                </p>
              </div>

              <div className="space-y-4 p-8 bg-gray-50 rounded-xl">
                <Users className="w-10 h-10 text-gray-900" />
                <h3 className="text-2xl font-bold text-gray-900">Craftsmanship</h3>
                <p className="text-gray-700">
                  Our skilled artisans combine traditional techniques with modern methods to create furniture that lasts generations.
                </p>
              </div>

              <div className="space-y-4 p-8 bg-gray-50 rounded-xl">
                <Zap className="w-10 h-10 text-gray-900" />
                <h3 className="text-2xl font-bold text-gray-900">Innovation</h3>
                <p className="text-gray-700">
                  We continuously invest in research and development to bring cutting-edge comfort technology to our collections.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Cuck Chair Architect was born from a simple observation: most chairs are designed by people who don't actually sit in them. Our late cofounder, Tarun Preet spent years in architecture before realizing that seating design was the intersection of art, science, and human experience.
              </p>
              <p>
                In 2025, Nikhil began collaborating with master craftspeople and ergonomic specialists to create the first collection. What started as a small studio in Brooklyn has grown into a global brand respected by designers, architects, and design enthusiasts worldwide.
              </p>
              <p>
                Today, we work with over 50 independent artisans and manufacturers across Europe and Asia, each bringing their unique expertise to our collections. We've received recognition from prestigious design institutions including the International Design Excellence Award and the American Institute of Architects.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Design Philosophy</h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Form Follows Function</h3>
                <p className="text-lg text-gray-700">
                  We believe that a chair's beauty comes from its purpose. Every curve, every joint, and every material choice serves a specific function—comfort, durability, or sustainability.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Timeless Over Trendy</h3>
                <p className="text-lg text-gray-700">
                  We don't chase trends. Instead, we create pieces that will be valued and appreciated for decades. Our designs are meant to age gracefully and become cherished heirlooms.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Honest Materials</h3>
                <p className="text-lg text-gray-700">
                  We celebrate the natural beauty of materials. Whether it's solid wood, premium leather, or innovative fabrics, we let each material speak for itself without unnecessary embellishment.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Accessible Design</h3>
                <p className="text-lg text-gray-700">
                  Beautiful design shouldn't be exclusive. We offer collections at various price points without compromising on quality or design integrity.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Awards & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { year: 2023, award: "Best Contemporary Furniture Design", org: "Design Awards International" },
                { year: 2022, award: "Sustainable Excellence", org: "Green Furniture Initiative" },
                { year: 2021, award: "Innovation in Comfort", org: "Ergonomic Design Society" },
                { year: 2020, award: "Architectural Furniture of the Year", org: "AIA Design Awards" },
                { year: 2019, award: "Emerging Designer Collection", org: "International Design Summit" },
                { year: 2018, award: "Craftsmanship Excellence", org: "Master Craftsmen Association" }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">{item.year}</p>
                  <p className="font-bold text-gray-900 mb-1">{item.award}</p>
                  <p className="text-sm text-gray-600">{item.org}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
            <p className="text-lg text-gray-700">
              Our team of 45+ professionals includes architects, designers, engineers, artisans, and visionaries who share a passion for exceptional furniture design. From concept to creation, each team member brings their unique expertise to every piece.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nikhil Thakuraan",
                  role: "Founder & Cuck Chair Architect",
                  image: "https://avatars.githubusercontent.com/u/231002597?v=4"
                },
                {
                  name: "Mistah White",
                  role: "Head of Sustainability",
                  image: "https://i.postimg.cc/7PG5MPnD/image.png"
                },
               {
                  name: "Jessie Pinkman",
                  role: "Chief Craftsman",
                  image: "https://i.postimg.cc/mkC2xDmB/DP.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900 text-white rounded-2xl p-12 space-y-6">
            <h2 className="text-4xl font-bold">Join Our Movement</h2>
            <p className="text-lg text-gray-300">
              Whether you're an architect, designer, retailer, or simply passionate about exceptional furniture, we'd love to collaborate with you. Explore our wholesale options, partnership opportunities, or simply reach out to discuss your project.
            </p>
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get in Touch
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
