import React, { useEffect, useRef } from 'react'
import { ArrowRight, Palette, Hammer, Video, Building2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './App.css'

import heroVideo from './assets/Create_this_as_a_video_that_setting_up_the_beds_co_0bd33ea530.mp4'
import exteriorImg from './assets/luxury_villa_exterior_1773415581768.png'
import interiorImg from './assets/luxury_villa_interior_1773415630184.png'
import constructionImg from './assets/villa_construction_1773415736024.png'

const Navbar = () => (
  <nav className="navbar glass">
    <div className="nav-logo">NM STUDIO</div>
    <div className="nav-links">
      <a href="#projects">Projects</a>
      <a href="#services">Expertise</a>
      <a href="#testimonials">Process</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useSmoothScroll()
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const processRef = useRef(null)
  const processTrackRef = useRef(null)
  const processItemsRef = useRef([])

  useEffect(() => {
    // Scroll animations
    gsap.utils.toArray('section').forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      )
    })

    // Hero video scroll interaction
    if (heroRef.current && videoRef.current) {
      gsap.to(videoRef.current, {
        y: '20%',
        scale: 1.15,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      // Content scroll parallax
      gsap.to('.hero-content', {
        y: '50%',
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'center top',
          scrub: true,
        }
      });
    }

    // Process section track and items
    if (processRef.current && processTrackRef.current) {
      // Animate the connecting line fill
      gsap.to(processTrackRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
      
      // Animate individual process items
      processItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        // Initial state before we animate
        gsap.set(item, { opacity: 0, x: -50 });
        
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, [])

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <video 
          ref={videoRef}
          src={heroVideo} 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 204, 0, 0.4) 100%)', zIndex: 1 }}></div>
        <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
          <div className="reveal-box">
            <h1 className="hero-hl">Designing Future <br /> Living Spaces</h1>
          </div>
          <p className="hero-sub">
            Pioneering architectural excellence through <br /> high-end visualization and luxury design.
          </p>
          <div style={{ marginTop: '40px' }}>
            <a href="#projects" className="btn-primary">
              Explore Projects <ArrowRight size={20} style={{ marginLeft: '12px', verticalAlign: 'middle' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects">
        <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '60px', textAlign: 'center', letterSpacing: '-0.04em', color: '#fff' }}>Featured Projects</h2>
        <div className="project-grid">
          {[
            { title: "Horizon Villa", img: exteriorImg, type: "Exterior Design" },
            { title: "Zenith Interior", img: interiorImg, type: "Interior Curation" },
            { title: "Stellar Estate", img: exteriorImg, type: "Architecture" },
            { title: "Lumina Penthouse", img: interiorImg, type: "3D Visualization" }
          ].map((project, i) => (
            <div key={i} className="navy-card project-card" style={{ 
              height: '500px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end', 
              position: 'relative', 
              overflow: 'hidden',
              backgroundImage: `url(${project.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{ zIndex: 2 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{project.title}</h3>
                <p style={{ opacity: 0.8 }}>{project.type}</p>
              </div>
              <div className="overlay"></div>
            </div>
          ))}
        </div>
      </section>



      <section id="services">
        <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '60px', textAlign: 'center', letterSpacing: '-0.04em', color: '#fff', textShadow: '0 2px 10px rgba(0,31,63,0.1)' }}>Our Expertise</h2>
        <div className="service-grid">
          {[
            { label: 'Design Quality', value: 'Bespoke', icon: <Palette size={32} /> },
            { label: 'Architecture', value: 'Elite', icon: <Building2 size={32} /> },
            { label: 'Renovation', value: 'Modern', icon: <Hammer size={32} /> },
            { label: 'Visualization', value: 'Cinema', icon: <Video size={32} /> }
          ].map((service, idx) => (
            <div key={idx} className="service-card">
              <div className="icon-container">
                {service.icon}
              </div>
              <div className="card-label">{service.label}</div>
              <h4>{service.value}</h4>
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials">
        <div className="navy-card" style={{ padding: '100px 60px', borderRadius: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '60px', color: '#fff' }}>Client Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {[
              { name: "John Sterling", role: "Real Estate Developer", text: "NM Studio's vision of the future is not just visual; it's experiential. They redefined our latest project." },
              { name: "Elena Rossi", role: "Villa Owner", text: "The 3D visualization was so accurate that walking into the completed house felt like jumping into the render." },
              { name: "David Chen", role: "Architect", text: "Their attention to detail and architectural integrity in 3D visualization is unparalleled in the industry." }
            ].map((t, i) => (
              <div key={i} style={{ textAlign: 'left', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '30px' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px', opacity: 0.9 }}>"{t.text}"</p>
                <div style={{ fontWeight: '700' }}>{t.name}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" ref={processRef}>
        <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '60px', textAlign: 'center', letterSpacing: '-0.04em', color: '#fff', textShadow: '0 2px 10px rgba(0,31,63,0.1)' }}>Our Process</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '80px' }}>
          
          {/* Connecting Track Line */}
          <div className="process-track">
            <div className="process-track-fill" ref={processTrackRef}></div>
          </div>

          {[
            { step: "01", title: "Consultation", desc: "Understanding your vision and spatial requirements." },
            { step: "02", title: "3D Visualization", desc: "Crafting high-end renders and walkthroughs." },
            { step: "03", title: "Material Selection", desc: "Curating premium finishes and high-tech materials." },
            { step: "04", title: "Execution", desc: "Managing the construction and interior setup." }
          ].map((item, i) => (
            <div 
              key={i} 
              className="process-item" 
              ref={el => processItemsRef.current[i] = el}
              style={{ display: 'flex', gap: '40px', marginBottom: '80px', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}
            >
              <div className="glow-circle">
                {item.step}
              </div>
              <div className="navy-card glow-card" style={{ flex: 1, padding: '40px', borderRadius: '20px' }}>
                <h4 className="glow-text" style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'inline-block' }}>{item.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '30px', color: '#fff', textShadow: '0 2px 10px rgba(0,31,63,0.1)' }}>Let's Build the Future</h2>
        <p style={{ marginBottom: '40px', color: '#86868B' }}>Ready to transform your space? Get in touch with our expert team.</p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="glass"
              style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.2)', color: 'var(--text-main)', fontSize: '1rem' }} 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="glass"
              style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.2)', color: 'var(--text-main)', fontSize: '1rem' }} 
            />
            <textarea 
              placeholder="Tell us about your project" 
              rows="5" 
              className="glass"
              style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.2)', color: 'var(--text-main)', fontSize: '1rem', resize: 'none' }}
            ></textarea>
            <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', justifyContent: 'center', fontSize: '1.1rem' }}>Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-glass">
        <p>&copy; 2026 NM Studio. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default App
