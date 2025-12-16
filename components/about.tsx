import Image from "next/image"

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-[#FDF8F3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[#F58D8C]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

             <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-[#F58D8C]/10 to-[#655A9C]/10 flex items-center justify-center">
                <Image
                  src="/images/inherbody logo4.jpg"
                  alt="InHerBody flower logo"
                  fill
                  className="object-contain"
                />
            </div>

            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#655A9C]">Driven By Community</h2>
              <p className="text-md text-gray-700 leading-relaxed mb-4">
                InHerBody is a women centered health initiative focused on awareness, research, and technology for
                conditions such as PCOS, endometriosis, and fibroids.
              </p>
              <p className="text-md text-gray-700 leading-relaxed">
                We combine education, community, and innovation to help women understand and care for their bodies.
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}
