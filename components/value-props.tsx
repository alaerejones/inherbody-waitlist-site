import { Microscope, Users, Wrench } from "lucide-react"

export default function ValueProps() {
  const props = [
    {
      title: "Shared Knowledge",
      description: "Learning together, not alone",
      detail: "InHerBody is that community where women come together to learn, question, and understand reproductive and hormonal health conditions that are often misunderstood. Knowledge here is shared, discussed, and grounded in shared experiences and evidence, not handed down or gatekept.",
      icon: Microscope,
    },
    {
      title: "Community Support",
      description: "No silence, no dismissal",
      detail: "This is a community built on shared experiences. Women connect, listen, and speak openly about PCOS, endometriosis, fibroids, menstrual health, and related concerns without being minimized or talked over. Support here means being seen, heard, and taken seriously.",
      icon: Users,
    },
    {
      title: "Community-Led Action",
      description: "Beyond internal conversation",
      detail: "Use technology designed specifically to track, manage, and understand your unique health needs.",
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
