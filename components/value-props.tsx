export default function ValueProps() {
  const props = [
    {
      title: "Science based insight",
      icon: "◆",
    },
    {
      title: "Supportive community",
      icon: "◆",
    },
    {
      title: "Tools built for women",
      icon: "◆",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="text-3xl text-[#F58D8C] mb-4">{prop.icon}</div>
              <p className="text-lg font-medium text-gray-900">{prop.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
