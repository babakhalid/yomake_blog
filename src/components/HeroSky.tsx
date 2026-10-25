'use client'

import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { skyFragment, skyVertex } from './hero-sky-shaders'

// Ported from the main app (yomake_v2/src/components/HeroSky.tsx). The blog's theme is
// .dark / .light on <html>, or the system preference when neither is set.
const isNight = () => {
  const root = document.documentElement
  if (root.classList.contains('dark')) return 1
  if (root.classList.contains('light')) return 0
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0
}

export default function HeroSky() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = root.current!
    let renderer: Renderer
    try {
      renderer = new Renderer({ alpha: false, antialias: false, depth: false, powerPreference: 'low-power', dpr: 1 })
    } catch {
      return
    }
    const gl = renderer.gl
    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: skyVertex,
      fragment: skyFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) },
        uTime: { value: 19 },
        uNight: { value: isNight() },
        uSteps: { value: 44 },
      },
    })
    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
      geometry.remove()
      program.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      return
    }
    const mesh = new Mesh(gl, { geometry, program })
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let visible = true
    let lost = false
    let lastFrame = 0
    let elapsed = 19
    let targetNight = program.uniforms.uNight.value
    let disposed = false

    const render = () => {
      if (!lost && !disposed) renderer.render({ scene: mesh })
    }
    const tick = (now: number) => {
      frame = 0
      if (disposed || lost || !visible || document.hidden || motion.matches) return
      // Limit the decorative sky to 30 fps and cap its pixel budget on all screens.
      if (now - lastFrame >= 1000 / 30) {
        elapsed += Math.min((now - lastFrame) / 1000, 0.1)
        lastFrame = now
        program.uniforms.uTime.value = elapsed
        program.uniforms.uNight.value += (targetNight - program.uniforms.uNight.value) * 0.09
        render()
      }
      frame = requestAnimationFrame(tick)
    }
    const syncPlayback = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (motion.matches) program.uniforms.uNight.value = targetNight
      if (!visible || document.hidden || lost) return
      render()
      if (!motion.matches) {
        lastFrame = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      const mobile = width < 768
      renderer.dpr = Math.min(1, Math.sqrt((mobile ? 180000 : 320000) / (width * height)))
      renderer.setSize(width, height)
      program.uniforms.uResolution.value.set([gl.canvas.width, gl.canvas.height])
      program.uniforms.uSteps.value = mobile ? 32 : 44
      render()
    }
    const themeObserver = new MutationObserver(() => {
      targetNight = isNight()
      if (motion.matches) {
        program.uniforms.uNight.value = targetNight
        render()
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })
    viewportObserver.observe(host)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    const onContextLost = (event: Event) => {
      event.preventDefault()
      lost = true
      cancelAnimationFrame(frame)
      gl.canvas.style.visibility = 'hidden'
    }
    // Reloading a lost context requires new GPU resources; preserve the CSS sky
    // until this component remounts rather than rendering with invalid resources.
    gl.canvas.addEventListener('webglcontextlost', onContextLost)
    gl.canvas.setAttribute('aria-hidden', 'true')
    host.appendChild(gl.canvas)
    resize()
    syncPlayback()
    motion.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      motion.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      gl.canvas.removeEventListener('webglcontextlost', onContextLost)
      resizeObserver.disconnect()
      viewportObserver.disconnect()
      themeObserver.disconnect()
      gl.canvas.remove()
      geometry.remove()
      program.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <div ref={root} className="hero-sky" aria-hidden="true"><div className="hero-sky-fallback" /></div>
}
