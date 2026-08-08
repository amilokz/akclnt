import React from 'react';

const team = [
    {
        name: 'Komil Hassan',
        role: 'Founder & Senior Developer',
        focus: 'Laravel & React full-stack development, custom PHP, project architecture',
    },
    {
        name: 'Javaria Shabbir',
        role: 'MERN Stack Developer',
        focus: 'MongoDB, Express, React, Node.js',
    },
    {
        name: 'Mustabshira',
        role: 'MERN Stack Developer',
        focus: 'MongoDB, Express, React, Node.js',
    },
    {
        name: 'Laiba',
        role: 'Flutter Developer',
        focus: 'Cross-platform mobile app development',
    },
    {
        name: 'Muhammad Jehanzaib',
        role: 'React & Laravel Developer',
        focus: 'Frontend development, API integration',
    },
    {
        name: 'Muhammad Amad',
        role: 'Graphic Designer',
        focus: 'Branding, UI design, visual identity',
    },

];

export default function Team() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                The people behind akclnt
            </span>
            <h1 className="font-display text-4xl font-semibold text-ink mt-3 max-w-xl">
                A small team that ships.
            </h1>
            <p className="text-graphite mt-4 max-w-lg">
                No account managers, no middlemen — you work directly with the
                developers building your project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {team.map((member, i) => (
                    <div key={i} className="border border-mist rounded-xl p-6">
                        <div className="w-12 h-12 rounded-full bg-signal-dim flex items-center justify-center font-display text-signal font-semibold mb-4">
                            {member.name.charAt(0)}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-ink">
                            {member.name}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-signal mt-1">
                            {member.role}
                        </p>
                        <p className="text-graphite text-sm mt-3">{member.focus}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}