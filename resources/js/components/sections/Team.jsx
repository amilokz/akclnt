const team = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
  },
  {
    name: "John Smith",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop",
  },
  {
    name: "Mira Anderson",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
  },
];

export function Team() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight uppercase">
          Meet Our Team
        </h2>
        <div className="mx-auto mt-3 w-12 h-1 rounded-full bg-signal" />
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Full Photo */}
            <div className="w-full overflow-hidden" style={{ height: "420px" }}>
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Name Bar */}
            <div className="bg-white px-6 py-5 border-t border-gray-100">
              <h3 className="font-display text-sm font-extrabold text-ink uppercase tracking-widest">
                {member.name}
              </h3>
              <p className="text-graphite text-sm mt-1 italic">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}