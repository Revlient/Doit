import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Consult',
        subtitle: 'The Beginning',
        desc: 'Talk to our interior designers & get an estimate.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2000&auto=format&fit=crop'
    },
    {
        number: '02',
        title: 'Design',
        subtitle: 'Concept & Form',
        desc: 'Detailed drawing and approval.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop'
    },
    {
        number: '03',
        title: 'Produce',
        subtitle: 'Materiality',
        desc: 'Production at own factory.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop'
    },
    {
        number: '04',
        title: 'Execute',
        subtitle: 'Realization',
        desc: 'Material delivery and execution as per commitment.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop'
    },
    {
        number: '05',
        title: 'Deliver',
        subtitle: 'Handover',
        desc: 'On time project hand over.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
            const totalPanels = panels.length;

            // Horizontal Scroll Animation
            gsap.to(panels, {
                xPercent: -100 * (totalPanels - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1, // Smooth interaction
                    // Calculate scroll amount based on number of panels to ensure smooth speed
                    end: () => "+=" + (containerRef.current?.offsetWidth || window.innerWidth) * (totalPanels - 1) / 6,
                    snap: {
                        snapTo: 1 / (totalPanels - 1),
                        duration: { min: 0.2, max: 0.6 },
                        delay: 0.1,
                        ease: "power2.inOut"
                    }
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={sectionRef} className="h-screen overflow-hidden bg-doit-black relative">

            {/* Sticky Header - Stays during scroll */}
            <div className="absolute top-8 left-6 md:top-12 md:left-16 z-20 pointer-events-none text-doit-white/80">
                <span className="text-xs font-sans tracking-[0.2em] uppercase opacity-70 block mb-2 text-doit-teal">The Approach</span>
                <h2 className="text-xl md:text-xl font-serif text-doit-white">Interior project completion within 45 working days<span className="text-doit-stone text-sm align-super">*</span></h2>
            </div>

            {/* Horizontal Container */}
            <div ref={containerRef} className="h-full flex flex-nowrap w-[500%]">
                {steps.map((step, index) => (
                    <div key={index} className="process-panel w-screen h-full flex flex-col md:flex-row relative bg-doit-black border-r border-doit-teal/5">

                        {/* Background Visual Layer (Subtle) */}
                        <div className="absolute inset-0 z-0 opacity-5 md:opacity-10 pointer-events-none">
                            <span className="panel-num text-[30vw] font-serif leading-none text-doit-deep-blue/30 absolute -bottom-20 -left-10 select-none">
                                {step.number}
                            </span>
                        </div>

                        {/* Left Content (Text) */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 relative z-10 order-2 md:order-1 pt-20 md:pt-0">
                            <div className="max-w-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-sm font-sans tracking-widest uppercase text-doit-teal border border-doit-teal/20 px-3 py-1 rounded-full">{step.subtitle}</span>
                                    <div className="h-[1px] w-12 bg-doit-teal/30"></div>
                                </div>

                                <h3 className="panel-heading text-5xl md:text-7xl lg:text-8xl font-serif text-doit-white mb-8 leading-[0.9]">
                                    {step.title}
                                </h3>

                                <p className="panel-desc text-base md:text-xl font-light text-doit-stone/90 font-sans leading-relaxed tracking-wide max-w-md">
                                    {step.desc}
                                </p>
                            </div>
                        </div>

                        {/* Right Content (Image) */}
                        <div className="w-full md:w-1/2 h-full relative overflow-hidden order-1 md:order-2">
                            <div className="absolute inset-0 bg-doit-surface-alt/20"></div>
                            <img
                                src={step.image}
                                alt={step.title}
                                className="panel-img w-full h-full object-cover opacity-80 brightness-[0.7] hover:brightness-90 hover:opacity-100 transition-all duration-700 ease-luxury"
                            />

                            {/* Optional Overlay Text */}
                            <div className="absolute bottom-10 right-10 z-10 hidden md:block">
                                <span className="text-doit-white text-xs tracking-widest uppercase drop-shadow-lg opacity-80">Doit / {step.number}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-doit-teal/10 w-full z-20">
                {/* This could be animated dynamically to show progress */}
            </div>
        </section>
    );
}
