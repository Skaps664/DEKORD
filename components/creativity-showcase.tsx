import { motion } from 'framer-motion'
import React from 'react'
import { Reveal } from './reveal'

const CreativityShowcase = () => {
  return (
    <div>
      <section id="creativity" className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Art of <span className="italic font-light">Creation</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Every dekord piece begins with a vision. From initial sketches to final production, we blend traditional craftsmanship with modern design thinking.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Design Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-foreground/10 rounded-full"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Design Philosophy</h3>
                <p className="text-muted-foreground">
                  We believe great design solves problems while telling stories. Every product reflects our commitment to functionality, aesthetics, and sustainability.
                </p>
              </div>
            </motion.div>

            {/* Craftsmanship */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-foreground/10 rounded-full"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-2xl">🔨</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Artisan Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Our team combines traditional techniques with modern technology. Each piece undergoes rigorous quality control to ensure perfection.
                </p>
              </div>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-foreground/10 rounded-full"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Forward Thinking</h3>
                <p className="text-muted-foreground">
                  We constantly push boundaries, exploring new materials and techniques while staying true to our core values of quality and sustainability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreativityShowcase
