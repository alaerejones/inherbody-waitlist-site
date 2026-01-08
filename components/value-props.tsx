import { Microscope, Users, Wrench } from "lucide-react"

export default function ValueProps() {
  const props = [
    {
      title: "Shared Knowledge",
      description: "Goal: Improve awareness and reduce misinformation around hormonal disorders",
      detail: "Low awareness and widespread misinformation around hormonal disorders such as PCOS and endometriosis mean many women do not understand what these conditions are, how they affect the body, or how they show up beyond fertility. The goal of InHerBody in this area is to improve awareness and reduce misinformation by creating a space where women can learn through shared conversations, questions, and experiences. As a community, knowledge is built collectively, using lived experience and open discussion to clarify what is often misunderstood, oversimplified, or ignored in mainstream conversations about women’s hormonal health.",
      icon: Microscope,
    },
    {
      title: "Community Support",
      description: "Goal: Reduce stigma and silence around women’s health",
      detail: "Low awareness and widespread misinformation around hormonal disorders such as PCOS and endometriosis mean many women do not understand what these conditions are, how they affect the body, or how they show up beyond fertility. The goal of InHerBody in this area is to improve awareness and reduce misinformation by creating a space where women can learn through shared conversations, questions, and experiences. As a community, knowledge is built collectively, using lived experience and open discussion to clarify what is often misunderstood, oversimplified, or ignored in mainstream conversations about women’s hormonal health.",
      icon: Users,
    },
    {
      title: "Community-Led Action",
      description: "Goal: Contribute collectively to awareness, discussion, and solutions",
      detail: "Beyond awareness and internal support, there is a broader gap in meaningful discussion, contribution, and action around women’s hormonal health. The goal of InHerBody in this area is collective contribution. As the community grows, shared voices, skills, experiences, and perspectives are brought together to strengthen conversations, support awareness efforts, and contribute to discussions, research, activities, and solution-oriented thinking around hormonal health. This includes contributing to prevention, management, and long-term approaches through community-led efforts, rather than relying on individual responsibility or isolated action.",
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
