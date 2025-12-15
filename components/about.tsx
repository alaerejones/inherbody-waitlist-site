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
                InherBody is a women’s health initiative committed to raising awareness, improving understanding, and driving action around women’s reproductive and hormonal health.

Our core focus is to increase awareness of conditions that are widely underreported and misunderstood, including PCOS, endometriosis, fibroids, menstrual health challenges, and broader hormonal concerns. We work to reduce stigma, shift public conversations, and encourage more people to speak, learn, and contribute openly to these topics without shame or silence.

InherBody creates safe, informed spaces for honest discussion through community conversations, research-led education, expert engagements, and shared lived experiences. Beyond awareness, we actively support better outcomes by contributing to preventive approaches, healthcare management solutions, and long-term interventions that improve quality of life for women with these conditions.
              </p>
              <p className="text-md text-gray-700 leading-relaxed">
                   We exist to help women understand their bodies more clearly, seek timely care, ask informed questions, and advocate for themselves with confidence. This is a growing community grounded in truth, care, and accountability, because women’s health deserves attention, respect, and real solutions.              </p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}
