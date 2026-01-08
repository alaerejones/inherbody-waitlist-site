import { Microscope, Users, Wrench } from "lucide-react"

export default function ValueProps() {
  const props = [
    {
      title: "Shared Knowledge",
      description: "Learning together, not alone",
      detail: "InHerBody is a space where women share experiences, ask questions, and learn from one another about hormonal health. Understanding here grows through conversation and shared support, especially in areas that are often misunderstood, misinformed or ignored.",
      icon: Microscope,
    },
    {
      title: "Community Support",
      description: "No silence, no dismissal",
      detail: "This community is built on shared support. Women connect, listen, and speak openly about hormonal disorders like PCOS, endometriosis, fibroids, and menstrual health without being minimized or dismissed.",
      icon: Users,
    },
    {
      title: "Community-Led Action",
      description: "Beyond internal conversation",
      detail: "InHerBody’s primary goal is collective contribution to addressing gaps in women’s hormonal health. Together, the community works to improve awareness, reduce stigma and misinformation, and strengthen conversations around hormonal health through shared voices and community led activities.",
      icon: Wrench,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {props.map((prop, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F58D8C]/10 flex items-center justify-center">
                  <prop.icon className="w-6 h-6 text-[#F58D8C]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{prop.title}</h3>
              </div>

              <p className="text-base font-medium text-[#655A9C] mb-2 ml-16">{prop.description}</p>

              <p className="text-sm text-gray-600 leading-relaxed ml-16">{prop.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
